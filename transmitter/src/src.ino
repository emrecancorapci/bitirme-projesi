#include "./data-controller.h"

void setup()
{
  Serial.begin(115200);

  while(!Serial) {
    delay(10);
  }
}

void loop()
{
  if (Serial.availableForWrite() > 0)
  {
    float humidity = 3.4567;
    char *name = "HUM";

    DataController::getInstance()->sendData(name, humidity);
  }
}
