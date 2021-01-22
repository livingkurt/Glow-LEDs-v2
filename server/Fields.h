/*
   ESP8266 + FastLED + IR Remote: https://github.com/jasoncoon/esp8266-fastled-webserver
   Copyright (C) 2016 Jason Coon

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

uint8_t power = 1;
uint8_t brightness = brightnessMap[brightnessIndex];

//String setPower(String value) {
//  power = value.toInt();
//  if(power < 0) power = 0;
//  else if (power > 1) power = 1;
//  return String(power);
//}

String getPower()
{
  return String(power);
}

//String setBrightness(String value) {
//  brightness = value.toInt();
//  if(brightness < 0) brightness = 0;
//  else if (brightness > 255) brightness = 255;
//  return String(brightness);
//}

String getBrightness()
{
  return String(brightness);
}

String getPattern()
{
  return String(currentPatternIndex);
}

String getPatterns()
{
  String json = "";

  for (uint8_t i = 0; i < patternCount; i++)
  {
    json += "\"" + patterns[i].name + "\"";
    if (i < patternCount - 1)
      json += ",";
  }

  return json;
}

String getPalette()
{
  return String(currentPaletteIndex);
}

String getPalettes()
{
  String json = "";

  for (uint8_t i = 0; i < paletteCount; i++)
  {
    json += "\"" + paletteNames[i] + "\"";
    if (i < paletteCount - 1)
      json += ",";
  }

  return json;
}
String getDevice()
{
  return String(currentDeviceIndex);
}

// String getDevices()
// {
//   String json = "";

//   for (uint8_t i = 0; i < deviceCount; i++)
//   {
//     // json += "\"" + devices[i].name + "\"" + devices[i].query_url + "\"";
//     json += "\"" + devices[i].name + "\"";
//     if (i < deviceCount - 1)
//       json += ",";
//   }

//   return json;
// }
String getDevices()
{
  String json = "";

  for (uint8_t i = 0; i < deviceCount; i++)
  {
    // json += "\"" + devices[i].name + "\"" + devices[i].query_url + "\"";
    // json += "\"" + devices[i].name + "\"";
    json += "{\"name\":\"" + devices[i].name + "\",\"queryURL\":\"" + devices[i].queryURL + "\"}";
    if (i < deviceCount - 1)
      json += ",";
  }

  return json;
}
// String getDeviceAddress()
// {
//   String json = "";

//   for (uint8_t i = 0; i < deviceCount; i++)
//   {
//     // json += "\"" + devices[i].name + "\"" + devices[i].query_url + "\"";
//     json += "\"" + devices[i].queryURL + "\"";
//     if (i < deviceCount - 1)
//       json += ",";
//   }

//   return json;
// }

String getAutoplayPattern()
{
  return String(autoplayPattern);
}
String getAutoplayPalette()
{
  return String(autoplayPalette);
}
String getBlendMode()
{
  return String(blendMode);
}
String getrandomPatternMode()
{
  return String(randomPatternMode);
}
String getrandomPaletteMode()
{
  return String(randomPaletteMode);
}

String getAutoplayPatternDuration()
{
  return String(autoplayPatternDuration);
}
String getAutoplayPaletteDuration()
{
  return String(autoplayPaletteDuration);
}

String getRGB()
{
  return String(rgb.r) + "," + String(rgb.g) + "," + String(rgb.b);
}
String getHSV()
{
  return String(hsv.h) + "," + String(hsv.s) + "," + String(hsv.v);
}

String getCooling()
{
  return String(cooling);
}

String getSparking()
{
  return String(sparking);
}

String getSpeed()
{
  return String(speed);
}
String getStrobe()
{
  return String(strobe);
}
String getBlank()
{
  return String(blank);
}
String getGap()
{
  return String(gap);
}
String getColorDensity()
{
  return String(colorDensity);
}
String getColorSpeed()
{
  return String(colorSpeed);
}
String getColorFade()
{
  return String(colorFade);
}

String getTwinkleSpeed()
{
  return String(twinkleSpeed);
}

String getTwinkleDensity()
{
  return String(twinkleDensity);
}

FieldList fields = {
    {"power", "Power", BooleanFieldType, 0, 1, 1, getPower},
    {"brightness", "Brightness", NumberFieldType, 1, 255, 1, getBrightness},
    {"pattern", "Pattern", SelectFieldType, 0, patternCount, 1, getPattern, getPatterns},
    {"palette", "Palette", SelectFieldType, 0, paletteCount, 1, getPalette, getPalettes},
    {
        "device",
        "Device",
        SelectFieldType,
        0,
        deviceCount,
        1,
        getDevice,
        getDevices,
        // getDeviceAddress,
    },
    {"speed", "Speed", NumberFieldType, 1, 255, 1, getSpeed},
    {"strobe", "Strobe", NumberFieldType, 0, 255, 1, getStrobe},
    {"blank", "Blank", NumberFieldType, 0, 255, 1, getBlank},
    {"gap", "Gap", NumberFieldType, 0, 255, 1, getGap},
    {"colorDensity", "Color Density", NumberFieldType, 1, 30, 1, getColorDensity},
    {"colorSpeed", "Color Speed", NumberFieldType, 1, 110, 1, getColorSpeed},
    {"colorFade", "Color Fade", NumberFieldType, 1, 150, 1, getColorFade},
    {"autoplayPattern", "Autoplay Pattern", SectionFieldType},
    {"autoplayPattern", "Autoplay Pattern", BooleanFieldType, 0, 1, 1, getAutoplayPattern},
    {"autoplayPalette", "Autoplay Palette", SectionFieldType},
    {"autoplayPalette", "Autoplay Palette", BooleanFieldType, 0, 1, 1, getAutoplayPalette},
    {"blendMode", "Blend", BooleanFieldType, 0, 1, 1, getBlendMode},
    {"randomPatternMode", "Randomize Patterns", BooleanFieldType, 0, 1, 1, getrandomPatternMode},
    {"randomPaletteMode", "Randomize Palettes", BooleanFieldType, 0, 1, 1, getrandomPaletteMode},
    {"autoplayPatternDuration", "Autoplay Pattern Duration", NumberFieldType, 0, 255, 1, getAutoplayPatternDuration},
    {"autoplayPaletteDuration", "Autoplay Palette Duration", NumberFieldType, 0, 255, 1, getAutoplayPaletteDuration},
    {"rgb", "RGB", SectionFieldType},
    {"rgb", "Color", ColorFieldType, 0, 255, 1, getHSV},
    {"hsv", "HSV", SectionFieldType},
    {"hsv", "Color", ColorFieldType, 0, 255, 1, getHSV},
    {"fire", "Fire & Water", SectionFieldType},
    {"cooling", "Cooling", NumberFieldType, 0, 255, 1, getCooling},
    {"sparking", "Sparking", NumberFieldType, 0, 255, 1, getSparking},
    {"twinkles", "Twinkles", SectionFieldType},
    {"twinkleSpeed", "Twinkle Speed", NumberFieldType, 0, 8, 1, getTwinkleSpeed},
    {"twinkleDensity", "Twinkle Density", NumberFieldType, 0, 8, 1, getTwinkleDensity},
};

uint8_t fieldCount = ARRAY_SIZE(fields);
