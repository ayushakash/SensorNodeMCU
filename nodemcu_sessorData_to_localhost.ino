#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

// Replace with your network credentials
const char* ssid = "Redmi11";
const char* password = "12345678";

// Server URL
const char* serverUrl = "http://192.168.0.100:3000/api/sendData";
const int sensor_pin = A0;

// Create JSON document
StaticJsonDocument<200> doc;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

}

void loop() {
  
  float moisture_percentage;
  moisture_percentage = ( 100.00 - ( (analogRead(sensor_pin)/1023.00) * 100.00 ) );

  Serial.print("Soil Moisture(in Percentage) = ");
  Serial.print(moisture_percentage);
  Serial.println("%");

  delay(1000);
  
  // Set the values in JSON document
  doc["moisture"] = moisture_percentage;
  doc["sensor_id"] = "1";
  
  String payload;
  // Serialize the JSON document
  serializeJson(doc, payload);
  
  HTTPClient http;
  WiFiClient client;
  http.begin(client, serverUrl);

  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(payload);

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    String response = http.getString();
    Serial.println(response);
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  
  http.end();
  
  delay(1000);
}
