#include <SimpleDHT.h>
#include "data-controller.h"

#define PIN_DHT 2

DataController *dataController = new DataController();
SimpleDHT11 dht(PIN_DHT);

byte dhtTemp = 0;
byte dhtHumid = 0;


void setup()
{
  Serial.begin(9600);

  while (!Serial.availableForWrite())
  {
    delay(100);
  }
  Serial.println("SR_RDY");
}

void loop()
{
  if (Serial.availableForWrite() > 0)
  {
    getDHTSensorValues();
    dataController->sendData("TMP", dhtTemp);
    delay(1000);
    dataController->sendData("HUM", dhtHumid);
    delay(1000);
  }
}

void getDHTSensorValues() {
  int err = SimpleDHTErrSuccess;
    if ((err = dht.read(&dhtTemp, &dhtHumid, NULL)) != SimpleDHTErrSuccess) {
    Serial.print("DHT Error="); Serial.print(SimpleDHTErrCode(err));
    Serial.print(","); Serial.println(SimpleDHTErrDuration(err)); delay(2000);
    return;
  }
}