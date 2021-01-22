//#define FASTLED_ALLOW_INTERRUPTS 1
//#define INTERRUPT_THRESHOLD 1
#define FASTLED_INTERRUPT_RETRY_COUNT 0

#include <FastLED.h>
FASTLED_USING_NAMESPACE

extern "C"
{
#include "user_interface.h"
}
#include <WiFiManager.h>
#include <ESP8266WiFi.h>
//#include <ESP8266mDNS.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPUpdateServer.h>
//#include <WebSocketsServer.h>
#include <WiFiClient.h>
#include <FS.h>
#include <EEPROM.h>
//#include <IRremoteESP8266.h>
#include "GradientPalettes.h"
// #include "modes/modes.h"
// #include <Ethernet.h>
// #include <SPI.h>

#define ARRAY_SIZE(A) (sizeof(A) / sizeof((A)[0]))

#include "Field.h"

//#define RECV_PIN D4
//IRrecv irReceiver(RECV_PIN);

//#include "Commands.h"

ESP8266WebServer webServer(80);
//WebSocketsServer webSocketsServer = WebSocketsServer(81);
ESP8266HTTPUpdateServer httpUpdateServer;

#include "FSBrowser.h"

#define MY_NAME "String Lights" //burn kitchen
#define DATA_PIN D2
#define SYSTEM_MAX_LEDS 100
#define LED_TYPE WS2811 //LED String
#define COLOR_ORDER RGB // LED String

#define NUM_LEDS SYSTEM_MAX_LEDS //try to sync everything

// #define NUM_LEDS 200
#define HALF_LEDS NUM_LEDS / 2

#define HALF_SYSTEM_MAX_LEDS HALF_LEDS

#define MILLI_AMPS 4000 // IMPORTANT: set the max milli-Amps of your power supply (4A = 4000mA) // standard usb
//#define MILLI_AMPS            30000 // 30 Amps

#define VOLTS 5 // IMPORTANT: LED Strip
//#define VOLTS           12 // IMPORTANT: LED String

#define FRAMES_PER_SECOND 120 // here you can control the speed. With the Access Point / Web Server the animations run a bit slower.

// const bool apMode = false;

CRGB leds[NUM_LEDS];

const uint8_t brightnessCount = 5;
uint8_t brightnessMap[brightnessCount] = {16, 32, 64, 128, 255};
uint8_t brightnessIndex = 0;

// ten seconds per color palette makes a good demo
// 20-120 is better for deployment
uint8_t secondsPerPalette = 10;

// COOLING: How much does the air cool as it rises?
// Less cooling = taller flames.  More cooling = shorter flames.
// Default 50, suggested range 20-100
uint8_t cooling = 50;

// SPARKING: What chance (out of 255) is there that a new spark will be lit?
// Higher chance = more roaring fire.  Lower chance = more flickery fire.
// Default 120, suggested range 50-200.
uint8_t sparking = 120;

uint8_t speed = 30;

uint8_t strobe = 30;
uint8_t gap = 30;
uint8_t blank = 30;

uint8_t colorDensity = 10;
uint8_t colorSpeed = 10;
uint8_t colorFade = 10;
// uint8_t start_index = -1 * millis() / rate;

///////////////////////////////////////////////////////////////////////

// Forward declarations of an array of cpt-city gradient palettes, and
// a count of how many there are.  The actual color palette definitions
// are at the bottom of this file.
extern const TProgmemRGBGradientPalettePtr gGradientPalettes[];

uint8_t gCurrentPaletteNumber = 0;

CRGBPalette16 gCurrentPalette(CRGB::Black);
CRGBPalette16 gTargetPalette(gGradientPalettes[0]);

CRGBPalette16 IceColors_p = CRGBPalette16(CRGB::Black, CRGB::Blue, CRGB::Aqua, CRGB::White);

uint8_t currentPatternIndex = 0; // Index number of which pattern is current
// uint8_t currentPaletteIndex = 0; // Index number of which pattern is current
uint8_t autoplayPattern = 0;
uint8_t autoplayPalette = 0;
uint8_t blendMode = 1;
uint8_t randomPatternMode = 0;
uint8_t randomPaletteMode = 0;

uint8_t autoplayPatternDuration = 10;
uint8_t autoplayPaletteDuration = 10;
unsigned long autoplayPatternTimeout = 0;
unsigned long autoplayPaletteTimeout = 0;

uint8_t currentPaletteIndex = 0;
uint8_t currentDeviceIndex = 0;

uint8_t rate = 10;
uint8_t gHue = 0; // rotating "base color" used by many of the patterns
// gHue = -1 * millis() / rate;

CRGB rgb = CRGB::Blue;
CHSV hsv = CHSV(255, 255, 255);

// scale the brightness of all pixels down
void dimAll(byte value)
{
  for (int i = 0; i < NUM_LEDS; i++)
  {
    leds[i].nscale8(value);
  }
}

typedef void (*Pattern)();
typedef Pattern PatternList[];
typedef struct
{
  Pattern pattern;
  String name;
} PatternAndName;
typedef PatternAndName PatternAndNameList[];

#include "Twinkles.h"
#include "TwinkleFOX.h"

// List of patterns to cycle through.  Each is defined as a separate function below.

PatternAndNameList patterns = {
    // {strobe_mode, "Strobe"},
    {cycle, "Cycle"},
    {pulse, "Pulse"},
    {cycle_rainbow_desaturated, "Cycle Rainbow Desaturated"},
    {sparkle, "Sparkle"},
    {shootingStar, "Shooting Star"},
    {colorWaves, "Color Waves"},
    {pride, "Pride"},
    {bpm, "Beat"},
    {juggle, "Juggle"},
    // {fire, "Fire"},
    // {water, "Water"},
    // {showRGB, "RGB"},
    {twinkles, "Twinkles"},
    {showHSV, "HSV"}};

const uint8_t patternCount = ARRAY_SIZE(patterns);

// typedef void (*Device)();
// typedef Device DeviceList[];

typedef struct
{
  String name;
  String queryURL;
} DeviceAndName;

typedef DeviceAndName DeviceAndNameList[];

// typedef struct
// {
//   String name;
//   String query_url;
// } DeviceAndName;
// typedef DeviceAndName DeviceAndNameList[];

DeviceAndNameList devices = {
    {"Living Room", "192.168.0.219"},
    {"Test", "192.168.0.152"},
    {"Test 2", "192.168.0.60"}};

const uint8_t deviceCount = ARRAY_SIZE(devices);

typedef struct
{
  CRGBPalette16 palette;
  String name;
} PaletteAndName;
typedef PaletteAndName PaletteAndNameList[];

const CRGBPalette16 palettes[] = {
    RainbowColors_p,
    OceanColors_p,
    ForestColors_p,
    PartyColors_p,
    HeatColors_p,
    jet_gp,
    es_rivendell_15_gp,
    es_ocean_breeze_036_gp,
    es_pinksplash_08_gp,
    Coral_reef_gp,
    es_vintage_01_gp,
    es_landscape_33_gp,
    rainbowsherbet_gp,
    gr65_hult_gp,
    GMT_drywet_gp,
    ib_jul01_gp,
    Colorfull_gp,
    tubepreview_gp,
    trove_gp,
    wildwinds_gp,
    angelrepose_gp,
    bambooblossom_gp,
    butterflyfairy_gp,
    cloud_gp,
    healingangel_gp,
    jeweleddragon_gp,
    pinkchampagne_gp,
    pinkfairyrose_gp,
    spellbound_gp,
    springangel_gp,
    tashangel_gp,
    angelcompassion_gp,
    qual_mixed_12_gp,
    mars_sand_dunes01_gp,
    aurora_borealis_gp,
    rain_gp};

const uint8_t paletteCount = ARRAY_SIZE(palettes);

const String paletteNames[paletteCount] = {
    "Rainbow",
    "Ocean",
    "Forest",
    "Party",
    "Heat",
    "Ocean Sunset",
    "Vanilla Mint",
    "Ocean Breeze",
    "Love",
    "Coral Reef",
    "Fire Ball",
    "Emerald Sunset",
    "Flower Garden",
    "Cotton Candy",
    "Autumn Water",
    "Faded Apple Tree",
    "Spring Time",
    "Pale Dawn",
    "Skittles",
    "Wind Chimes",
    "Bubble Gum",
    "Pink Roses",
    "Dusk",
    "Fairy Field",
    "Pastel",
    "Orange Fade",
    "Popsicle",
    "Apple Blossoms",
    "Lollypopsicle",
    "River Rocks",
    "Arctic Winds",
    "Navy Cloud",
    "Desaturation",
    "Rainy Day",
    "Aurora Borealis",
    "LoFi"};

#include "Fields.h"

void (*resetFunc)(void) = 0;

const bool apMode = false;

void setup()
{
  WiFi.setSleepMode(WIFI_NONE_SLEEP);

  Serial.begin(115200);
  delay(100);
  Serial.setDebugOutput(true);
  FastLED.addLeds<LED_TYPE, DATA_PIN, COLOR_ORDER>(leds, NUM_LEDS); // for WS2812 (Neopixel)
  //FastLED.addLeds<LED_TYPE,DATA_PIN,CLK_PIN,COLOR_ORDER>(leds, NUM_LEDS); // for APA102 (Dotstar)
  FastLED.setDither(false);
  FastLED.setCorrection(TypicalLEDStrip);
  FastLED.setBrightness(brightness);
  FastLED.setMaxPowerInVoltsAndMilliamps(VOLTS, MILLI_AMPS);
  fill_solid(leds, NUM_LEDS, CRGB::Black);
  FastLED.show();

  EEPROM.begin(512);
  loadSettings();

  FastLED.setBrightness(brightness);

  //  irReceiver.enableIRIn(); // Start the receiver

  Serial.println();
  Serial.print(F("Heap: "));
  Serial.println(system_get_free_heap_size());
  Serial.print(F("Boot Vers: "));
  Serial.println(system_get_boot_version());
  Serial.print(F("CPU: "));
  Serial.println(system_get_cpu_freq());
  Serial.print(F("SDK: "));
  Serial.println(system_get_sdk_version());
  Serial.print(F("Chip ID: "));
  Serial.println(system_get_chip_id());
  Serial.print(F("Flash ID: "));
  Serial.println(spi_flash_get_id());
  Serial.print(F("Flash Size: "));
  Serial.println(ESP.getFlashChipRealSize());
  Serial.print(F("Vcc: "));
  Serial.println(ESP.getVcc());
  Serial.println();

  SPIFFS.begin();
  {
    Serial.println("SPIFFS contents:");

    Dir dir = SPIFFS.openDir("/");
    while (dir.next())
    {
      String fileName = dir.fileName();
      size_t fileSize = dir.fileSize();
      Serial.printf("FS File: %s, size: %s\n", fileName.c_str(), String(fileSize).c_str());
    }
    Serial.printf("\n");
  }

  //disabled due to https://github.com/jasoncoon/esp8266-fastled-webserver/issues/62
  //initializeWiFi();
  wifi_setup();
  run_server();

  autoplayPatternTimeout = millis() + (autoplayPatternDuration * 1000);
  autoplayPaletteTimeout = millis() + (autoplayPaletteDuration * 1000);
}

void sendInt(uint8_t value)
{
  sendString(String(value));
}

void sendString(String value)
{
  webServer.send(200, "text/plain", value);
}

void broadcastInt(String name, uint8_t value)
{
  String json = "{\"name\":\"" + name + "\",\"value\":" + String(value) + "}";
  //  webSocketsServer.broadcastTXT(json);
}

void broadcastString(String name, String value)
{
  String json = "{\"name\":\"" + name + "\",\"value\":\"" + String(value) + "\"}";
  //  webSocketsServer.broadcastTXT(json);
}

int forwards(int length, int placement, int pos)
{
  return (length * placement) + pos;
}

int backwards(int length, int placement, int pos)
{
  return length * placement - 1 - pos;
}

void hold(int period)
{
  unsigned long time_now = 0;
  time_now = millis();
  while (millis() < time_now + period)
  {
  }
}

void loop()
{
  // wifi_loop();
  // Add entropy to random number generator; we use a lot of it.
  random16_add_entropy(random(65535));

  //  dnsServer.processNextRequest();
  //  webSocketsServer.loop();
  webServer.handleClient();

  //  handleIrInput();

  if (power == 0)
  {
    fill_solid(leds, NUM_LEDS, CRGB::Black);
    FastLED.show();
    // FastLED.delay(15);
    return;
  }

  static bool hasConnected = false;
  EVERY_N_SECONDS(1)
  {
    if (WiFi.status() != WL_CONNECTED)
    {
      //      Serial.printf("Connecting to %s\n", ssid);
      hasConnected = false;
    }
    else if (!hasConnected)
    {
      hasConnected = true;
      Serial.print("Connected! Open http://");
      Serial.print(WiFi.localIP());
      Serial.println(" in your browser");
    }
  }

  // EVERY_N_SECONDS(10) {
  //   Serial.print( F("Heap: ") ); Serial.println(system_get_free_heap_size());
  // }

  // change to a new cpt-city gradient palette
  EVERY_N_SECONDS(secondsPerPalette)
  {
    gCurrentPaletteNumber = addmod8(gCurrentPaletteNumber, 1, gGradientPaletteCount);
    gTargetPalette = gGradientPalettes[gCurrentPaletteNumber];
  }

  EVERY_N_MILLISECONDS(40)
  {
    // slowly blend the current palette to the next
    nblendPaletteTowardPalette(gCurrentPalette, gTargetPalette, 8);
    gHue++; // slowly cycle the "base color" through the rainbow
  }

  if (autoplayPattern && (millis() > autoplayPatternTimeout))
  {
    if (randomPatternMode)
    {
      randomPattern(true);
    }
    else
    {
      adjustPattern(true);
    }

    autoplayPatternTimeout = millis() + (autoplayPatternDuration * 1000);
  }
  if (autoplayPalette && (millis() > autoplayPaletteTimeout))
  {
    if (randomPaletteMode)
    {
      randomPalette(true);
    }
    else
    {
      adjustPalette(true);
    }

    autoplayPaletteTimeout = millis() + (autoplayPaletteDuration * 1000);
  }

  // Call the current pattern function once, updating the 'leds' array
  patterns[currentPatternIndex].pattern();
  // palettes[currentPaletteIndex].palette();

  FastLED.show();

  // insert a delay to keep the framerate modest
  //  FastLED.delay(1000 / FRAMES_PER_SECOND);
}
