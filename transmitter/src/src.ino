#include "data-controller.h"

const DataController *dataController = new DataController();

void setup()
{
  Serial.begin(115200);

  while (!Serial.availableForWrite())
  {
    delay(100);
  }
}

void loop()
{
  if (Serial.availableForWrite() > 0)
  {
    float humidity = 3.4567;
    char *name = "HUM";

    dataController->sendData(name, humidity);
  }
}
