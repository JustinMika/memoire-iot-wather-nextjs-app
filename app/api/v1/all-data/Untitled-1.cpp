#include <DHT11.h>
#include <LiquidCrystal_I2C.h>
#include <ESP8266WiFi.h>
#include "ESPAsyncWebServer.h"
#include <DHT.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

#define OLED_RESET -1       // Reset pin # (or -1 if sharing Arduino reset pin)
#define SCREEN_ADDRESS 0x3C ///< See datasheet for Address; 0x3D for 128x64, 0x3C for 128x32
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

#define LOGO_HEIGHT 16
#define LOGO_WIDTH 16
#define NUMFLAKES 10

DHT humiditeettemperatureambiant(D3, DHT11);

AsyncWebServer server(80);
String pluiedata;

String dv = "0";
String vv = "0";

long dvtemps;
long retourvitessezero;

String lux;

const char *ssid = "Deus sive natura";
const char *password = "1234567890";

float temperature;
float humiditee;

String temperatureString;
String humiditeeString;
String niveaueaudata;

float niv;
String dataprecipitation = "0";

String envoiedataentrepot()
{
   String datajardino;
   datajardino = "{";
   datajardino = datajardino + "\"ta\"";
   datajardino = datajardino + ":";
   datajardino = datajardino + readTemp();
   datajardino = datajardino + ",";

   datajardino = datajardino + "\"ha\"";
   datajardino = datajardino + ":";
   datajardino = datajardino + readHumi() + ",";

   datajardino = datajardino + "\"lx\"";
   datajardino = datajardino + ":";
   datajardino = datajardino + lux + ",";

   datajardino = datajardino + "\"Vv\"";
   datajardino = datajardino + ":";
   datajardino = datajardino + vv + ",";

   datajardino = datajardino + "\"Dv\"";
   datajardino = datajardino + ":";
   datajardino = datajardino + dv + ",";

   datajardino = datajardino + "\"Np\"";
   datajardino = datajardino + ":";
   datajardino = datajardino + pluiedata + ",";

   datajardino = datajardino + "\"Pp:\"";
   datajardino = datajardino + ":";
   datajardino = datajardino + dataprecipitation + ",";

   datajardino = datajardino + "\"Co\"";
   datajardino = datajardino + ":";
   datajardino = datajardino + "56";

   datajardino = datajardino + "}";
   return datajardino;
}

long temps;

boolean afficheniveau;
boolean mvula;

void setup()
{
   pinMode(D0, OUTPUT);
   pinMode(D8, OUTPUT);

   pinMode(D6, INPUT);

   pinMode(D7, INPUT);

   humiditeettemperatureambiant.begin();
   configurationcapteurpluiegeneral();

   if (!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS))
   {
      Serial.println(F("SSD1306 allocation failed"));
      for (;;)
         ; // Don't proceed, loop forever
   }

   display.clearDisplay();
   display.clearDisplay();

   display.display();

   display.clearDisplay();
   display.display();

   display.setTextSize(1);
   display.setTextColor(1);
   display.setCursor(0, 0);
   display.println("CENTRE METEO");
   display.display();
   Serial.begin(115200);
   Serial.println();
   Serial.print("Setting AP (Access Point)…");
   WiFi.begin(ssid, password);

   while (WiFi.status() != WL_CONNECTED)
   {
      digitalWrite(D0, HIGH);
      delay(350);
      digitalWrite(D0, LOW);
      delay(350);
      Serial.print(".");
   }

   digitalWrite(D8, HIGH);

   server.begin();
   Serial.println("Server started");
   Serial.print("http://");
   Serial.println(WiFi.localIP());

   server.on("/api/data", HTTP_GET, [](AsyncWebServerRequest *request)
             { request->send_P(200, "application/json", envoiedataentrepot().c_str()); });

   bool status;
   server.begin();

   temps = millis();
   dvtemps = millis();
}

long tempsvv;
boolean databoolvv = false;

void loop()
{
   temperature = humiditeettemperatureambiant.readTemperature();
   humiditee = humiditeettemperatureambiant.readHumidity();
   pluiedata = dataniveaupluie();

   if (digitalRead(D7) == HIGH)
   {
      Serial.println("Ok");
      vv = vitessevent();
      databoolvv = true;
   }

   if (vv == "0" && databoolvv == false)
   {
   }

   if (vv != "0")
   {
      tempsvv = millis();
      if (millis() - tempsvv > 10000)
      {
         vv = "0";
         databoolvv = false;
      }
   }

   if (millis() - dvtemps > 5000)
   {
      dv = directionvent();
      dvtemps = millis();
      vv = "0";
   }

   if (digitalRead(D6) == HIGH)
   {
      lux = "0";
   }
   else
   {
      lux = "1";
   }

   if (millis() - temps > 2000)
   {
      display.clearDisplay();
      display.display();
      temps = millis();
      afficheniveau = false;
   }

   display.display();
   display.setTextSize(1);
   display.setTextColor(1);
   display.setCursor(0, 0);
   display.println("METEO CHAMPS CONNECTE");
   display.display();

   display.setTextSize(1);
   display.setTextColor(1);
   display.setCursor(0, 10);
   display.println("TEMP.:");
   display.display();

   display.setTextSize(1);
   display.setTextColor(1);
   display.setCursor(30, 10);
   display.println(temperature);
   display.display();

   display.setTextSize(1);
   display.setTextColor(1);
   display.setCursor(0, 20);
   display.println("HUM.:");
   display.display();

   display.setTextSize(1);
   display.setTextColor(1);
   display.setCursor(30, 20);
   display.println(humiditee);
   display.display();

   display.setTextSize(1);
   display.setTextColor(1);
   display.setCursor(0, 30);
   display.println("NP.:");
   display.display();

   display.setTextSize(1);
   display.setTextColor(1);
   display.setCursor(30, 30);
   display.println(pluiedata);
   display.println("            ");
   display.display();

   display.setTextSize(1);
   display.setTextColor(1);
   display.setCursor(0, 40);
   display.println("PLUIE.:");
   display.display();

   if (niv > 15)
   {
      dataprecipitation = "1";
      display.setTextSize(1);
      display.setTextColor(1);
      display.setCursor(30, 40);
      display.println("1");
      display.display();
   }
   else
   {
      dataprecipitation = "0";
      display.setTextSize(1);
      display.setTextColor(1);
      display.setCursor(30, 40);
      display.println("0");
      display.display();
   }

   display.setTextSize(1);
   display.setTextColor(1);
   display.setCursor(0, 50);
   display.println("LUX.:");
   display.display();

   display.setTextSize(1);
   display.setTextColor(1);
   display.setCursor(30, 50);
   display.println(lux);
   display.display();

   display.setTextSize(1);
   display.setTextColor(1);
   display.setCursor(60, 50);
   display.println("V.V.:");
   display.display();

   display.setTextSize(1);
   display.setTextColor(1);
   display.setCursor(90, 50);
   display.println(vv);

   display.display();
   // dataniveaupluie ()
}

String readTemp()
{
   temperature = humiditeettemperatureambiant.readTemperature();
   temperatureString = temperature;
   return temperatureString;
}

String readHumi()
{
   humiditee = humiditeettemperatureambiant.readHumidity();
   humiditeeString = humiditee;
   return humiditeeString;
}

String dataniveaupluie()
{
   long valeurmax = 13;
   digitalWrite(D5, LOW);
   delayMicroseconds(2);
   digitalWrite(D5, HIGH);
   delayMicroseconds(10);
   digitalWrite(D5, LOW);

   float niveau = 130 - (pulseIn(D4, HIGH) / 58.0) * 10;

   if (niveau < 0)
   {
      niveau = 0;
   }
   niveaueaudata = niveau;
   niv = niveau;

   return niveaueaudata;
}

void configurationcapteurpluiegeneral()
{
   pinMode(D5, OUTPUT);
   pinMode(D4, INPUT);
}

String directionvent()
{
   float directionventdata = analogRead(A0);
   String infovent;
   infovent = directionventdata;
   return infovent;
}

String vitessevent()
{
   String datadata;
   float vitesse;
   if (digitalRead(D7) == HIGH)
   {
      vitesse = random(7, 40);
      datadata = vitesse;
      return datadata;
   }
}
