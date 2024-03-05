#include "data-controller.h"
#include <Arduino.h>

DataController *DataController::_dataController = nullptr;

void DataController::sendData(const char *name, float value)
{
    storeValue(name, value);
    sendValue();
    cleanBuffers();
}

void DataController::storeValue(const char *name, float value)
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

DataController *DataController::getInstance()
{
    if (_dataController == nullptr)
    {
        _dataController = new DataController();
    }

    return _dataController;
}