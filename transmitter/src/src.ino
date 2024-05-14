#include "config.h"
#include "dht.h"
#include "communication.h"

void setup()
{
  Serial.begin(9600);
  pinMode(PIN_LED, OUTPUT);
}

void loop()
{
  sendDHTReading();
  delay(COMM_DELAY);
}

void sendDHTReading()
{
  runDHTSensor();
  DHTReading values = getDHTSensorValues();

  Communication::send_string("TP", values.temp);
  Communication::send_string("HD", values.humidity);
}