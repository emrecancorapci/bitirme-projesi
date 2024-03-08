#include "data-storage.h"
#include <Arduino.h>

void DataStorage::addData(String key, float value) const
{
    dataSet->push(key, value);
}

void DataStorage::addUnparsedData(String dataBuffer) const
{
    KvPair<String, float> parsedData = parseData(dataBuffer);
    dataSet->push(parsedData.key, parsedData.value);

    // while(!Serial.availableForWrite()){}
    // Serial.print("Data added: ");
    // Serial.print(parsedData.key);
    // Serial.print(" : ");
    // Serial.println(parsedData.value);
    // Serial.println(dataBuffer);
}

KvPair<String, float> DataStorage::parseData(String dataBuffer) const
{
    const String dataType = dataBuffer.substring(0, 3);
    const float dataValue = dataBuffer.substring(4, 7).toFloat();

    return KvPair<String, float>(dataType, dataValue);
}

void DataStorage::removeData(String key) const
{
    dataSet->remove(key);
}

void DataStorage::clearData() const
{
    dataSet->clear();
}

float DataStorage::getData(String key) const
{
    return dataSet->get(key);
}

void DataStorage::printData() const
{
    dataSet->print();
}
