#include "data-storage.h"

const DataStorage* dataStorage = new DataStorage();
String buffer;

void setup()
{
  Serial.begin(115200);

  while (!Serial.available())
  {
    delay(100);
  }
  while (!Serial.availableForWrite())
  {
    delay(100);
  }

}

void loop()
{
  if (Serial.available() > 0)
  {
    buffer = Serial.readString();
    // dataStorage->addUnparsedData(buffer);
  }
  if (Serial.availableForWrite() > 0)
  {
    Serial.println(buffer);
    // Serial.print(dataStorage->getMessageBuffer());
    // dataStorage->printData();
  }
}
