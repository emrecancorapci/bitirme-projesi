#include "data-storage.h"

Kvp<String, float> DataStorage::parseData(String dataBuffer)
{
    const String dataType = dataBuffer.substring(0, 2);
    const float dataValue = dataBuffer.substring(4, 7).toFloat();

    return Kvp<String, float>(dataType, dataValue);
}

DataStorage *DataStorage::getInstance()
{
    if (dataStoragePointer == nullptr)
    {
        dataStoragePointer = new DataStorage();
    }

    return dataStoragePointer;
}

void DataStorage::addData(String key, float value)
{
    dataSet->add(key, value);
}

void DataStorage::addUnparsedData(String dataBuffer)
{
    Kvp<String, float> parsedData = parseData(dataBuffer);
    dataSet->add(parsedData.key, parsedData.value);
}

void DataStorage::removeData(String key)
{
    dataSet->remove(key);
}

void DataStorage::clearData()
{
    dataSet->clear();
}

float DataStorage::getData(String key)
{
    return dataSet->get(key);
}
