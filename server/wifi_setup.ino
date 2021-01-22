// AP mode password
const char WiFiAPPSK[] = "";

const char *ssid;
const char *password;

const char *host = "www.glow-leds-dev.herokuapp.com/";
const int httpsPort = 443;

// Use web browser to view and copy
// SHA1 fingerprint of the certificate
//const char* fingerprint = "35 85 74 EF 67 35 A7 CE 40 69 50 F3 C0 F6 80 CF 80 3B 2E 19";
//const char* fingerprint = "5f b7 ee 06 33 e2 59 db ad 0c 4c 9a e6 d3 8f 1a 61 c7 dc 25";
const char *fingerprint = "5f f1 60 31 09 04 3e f2 90 d2 b0 8a 50 38 04 e8 37 9f bc 76";

void wifi_loop()
{
  WiFiClientSecure client;

  Serial.printf("\n[Connecting to %s ... ", host);
  if (client.connect(host, 80))
  {
    Serial.println("connected]");

    Serial.println("[Sending a request]");
    client.print(String("GET /") + " HTTP/1.1\r\n" +
                 "Host: " + host + "\r\n" +
                 "Connection: close\r\n" +
                 "\r\n");

    Serial.println("[Response:]");
    while (client.connected())
    {
      if (client.available())
      {
        String line = client.readStringUntil('\n');
        Serial.println(line);
      }
    }
    client.stop();
    Serial.println("\n[Disconnected]");
  }
  else
  {
    Serial.println("connection failed!]");
    client.stop();
  }
  delay(5000);
}

void wifi_setup()
{
  if (apMode)
  {
    WiFi.mode(WIFI_AP);

    // Do a little work to get a unique-ish name. Append the
    // last two bytes of the MAC (HEX'd) to "Thing-":
    uint8_t mac[WL_MAC_ADDR_LENGTH];
    WiFi.softAPmacAddress(mac);
    String macID = String(mac[WL_MAC_ADDR_LENGTH - 2], HEX) +
                   String(mac[WL_MAC_ADDR_LENGTH - 1], HEX);
    macID.toUpperCase();
    //    String AP_NameString = "Thousand Petal Lotus " + macID;
    //    String AP_NameString = "Bed " + macID;
    //    String AP_NameString = "First Floor " + macID;
    String AP_NameString = String(MY_NAME) + " " + macID;

    char AP_NameChar[AP_NameString.length() + 1];
    memset(AP_NameChar, 0, AP_NameString.length() + 1);

    for (int i = 0; i < AP_NameString.length(); i++)
      AP_NameChar[i] = AP_NameString.charAt(i);

    WiFi.softAP(AP_NameChar, WiFiAPPSK);

    Serial.printf("Connect to Wi-Fi access point: %s\n", AP_NameChar);
    // Serial.println("and open http://192.168.4.1 in your browser");
  }
  else
  {
    Serial.begin(115200);
    WiFiManager wifiManager;
    Serial.println("Connecting.....");
    wifiManager.autoConnect("GlowControl");
    Serial.println("Connected");
    ssid = WiFi.SSID().c_str();
    password = WiFi.psk().c_str();
    WiFi.mode(WIFI_STA);
    Serial.printf("Connecting to %s\n", ssid);
    if (String(WiFi.SSID()) != String(ssid))
    {
      WiFi.begin(ssid, password);
    }
  }
  // wifi_loop();
  // WiFiClientSecure client;
  // Serial.print("connecting to ");
  // Serial.println(host);
  // if (!client.connect(host, httpsPort))
  // {
  //   Serial.println("connection failed");
  //   return;
  // }

  // if (client.verify(fingerprint, host))
  // {
  //   Serial.println("certificate matches");
  // }
  // else
  // {
  //   Serial.println("certificate doesn't match");
  // }

  // String url = "/";
  // Serial.print("requesting URL: ");
  // Serial.println(url);

  // client.print(String("GET ") + url + " HTTP/1.1\r\n" +
  //              "Host: " + host + "\r\n" +
  //              "User-Agent: BuildFailureDetectorESP8266\r\n" +
  //              "Connection: close\r\n\r\n");

  // Serial.println("request sent");
  // while (client.connected())
  // {
  //   String line = client.readStringUntil('\n');
  //   if (line == "\r")
  //   {
  //     Serial.println("headers received");
  //     break;
  //   }
  // }
  // String line = client.readStringUntil('\n');
  // if (line.startsWith("{\"state\":\"success\""))
  // {
  //   Serial.println("esp8266/Arduino CI successfull!");
  // }
  // else
  // {
  //   Serial.println("esp8266/Arduino CI has failed");
  // }
  // Serial.println("reply was:");
  // Serial.println("==========");
  // Serial.println(line);
  // Serial.println("==========");
  // Serial.println("closing connection");
}

// ___________________________________________________
// while (WiFi.status() != WL_CONNECTED)
// {
//   delay(500);
//   Serial.print(".");
// }

// const char *host = "http.//glow-leds-dev.herokuapp.com/";
// const int httpsPort = 443;
// Serial.println("");
// Serial.println("WiFi connected");
// Serial.println("IP address: ");
// Serial.println(WiFi.localIP());

// // Use WiFiClientSecure class to create TLS connection
// WiFiClientSecure client;
// Serial.print("connecting to ");
// Serial.println(host);
// if (!client.connect(host, httpsPort))
// {
//   Serial.println("connection failed");
//   return;
// }

// // if (client.verify(fingerprint, host))
// // {
// //   Serial.println("certificate matches");
// // }
// // else
// // {
// //   Serial.println("certificate doesn't match");
// // }

// String url = "/api/promos/";
// Serial.print("requesting URL: ");
// Serial.println(url);

// client.print(String("GET ") + url + " HTTP/1.1\r\n" +
//              "Host: " + host + "\r\n" +
//              "User-Agent: BuildFailureDetectorESP8266\r\n" +
//              "Connection: close\r\n\r\n");

// Serial.println("request sent");
// while (client.connected())
// {
//   String line = client.readStringUntil('\n');
//   if (line == "\r")
//   {
//     Serial.println("headers received");
//     break;
//   }
// }
// String line = client.readStringUntil('\n');
// if (line.startsWith("{\"state\":\"success\""))
// {
//   Serial.println("esp8266/Arduino CI successfull!");
// }
// else
// {
//   Serial.println("esp8266/Arduino CI has failed");
// }
// Serial.println("reply was:");
// Serial.println("==========");
// Serial.println(line);
// Serial.println("==========");
// Serial.println("closing connection");

// ___________________________________________________

// // Initialize Serial port
// Serial.begin(9600);
// while (!Serial)
//   continue;

// // Initialize Ethernet library
// byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};
// Ethernet.init(8); // use pin 53 for Ethernet CS

// if (!Ethernet.begin(mac))
// {
//   Serial.println(F("Failed to configure Ethernet"));
//   return;
// }
// delay(1000);

// Serial.println(F("Connecting..."));

// // Connect to HTTP server
// EthernetClient client;
// client.setTimeout(10000);
// if (!client.connect("http://glow-leds-dev.herokuapp.com", 80))
// {
//   Serial.println(F("Connection failed"));
//   return;
// }

// Serial.println(F("Connected!"));

// // Send HTTP request
// client.println(F("GET /api/command/ HTTP/1.1"));
// client.println(F("Host: https://glow-leds-dev.herokuapp.com"));
// client.println(F("Connection: close"));
// Serial.println(F("Done"));
// if (client.println() == 0)
// {
//   Serial.println(F("Failed to send request"));
//   return;
// }

// // Check HTTP status
// char status[32] = {0};
// client.readBytesUntil('\r', status, sizeof(status));
// Serial.println(status);
// if (strcmp(status, "HTTP/1.1 200 OK") != 0)
// {
//   Serial.print(F("Unexpected response: "));
//   Serial.println(status);
//   return;
// }

// // Skip HTTP headers
// char endOfHeaders[] = "\r\n\r\n";
// if (!client.find(endOfHeaders))
// {
//   Serial.println(F("Invalid response"));
//   return;
// }

// // Allocate JsonBuffer
// // Use arduinojson.org/assistant to compute the capacity.
// const size_t capacity = JSON_OBJECT_SIZE(3) + JSON_ARRAY_SIZE(2) + 60;
// DynamicJsonBuffer jsonBuffer(capacity);

// // Parse JSON object
// JsonObject &root = jsonBuffer.parseObject(client);
// if (!root.success())
// {
//   Serial.println(F("Parsing failed!"));
//   return;
// }

// // Extract values
// Serial.println(F("Response:"));
// Serial.println(root["command"].as<char *>());

// // Disconnect
// client.stop();