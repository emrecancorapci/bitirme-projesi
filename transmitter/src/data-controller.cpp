#include "data-controller.h"
#include <Arduino.h>

void DataController::sendData(const char *name, const float &value)
{
    storeValue(name, value);
    sendValue();
    cleanBuffers();
}

void DataController::storeValue(const char *name, const float &value)
{
    dtostrf(value, 4, 3, floatBuffer);           // Convert float to string
    sprintf(buffer, "%s:%s", name, floatBuffer); // Format string
}

void DataController::sendValue()
{
    Serial.println(buffer);
}

void DataController::cleanBuffers()
{
    memset(buffer, 0, sizeof(buffer));
    memset(floatBuffer, 0, sizeof(floatBuffer));
}
