#include <SimpleDHT.h>
#include "config.h"

SimpleDHT11 dht(PIN_DHT);

byte dhtTemp = 0;
byte dhtHumid = 0;

struct DHTReading {
  float temp;
  float humidity;
};

void runDHTSensor() {
  int err = SimpleDHTErrSuccess;
  if ((err = dht.read(&dhtTemp, &dhtHumid, NULL)) != SimpleDHTErrSuccess) {
    Serial.print("ERR_DHT-");
    Serial.print(SimpleDHTErrCode(err));
    Serial.print(",");
    Serial.println(SimpleDHTErrDuration(err));
    return;
  }
}

DHTReading getDHTSensorValues() {
    return {dhtTemp, dhtHumid};
};