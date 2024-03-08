#pragma once
#include "unique-set.h"

class DataStorage
{
private:
    UniqueSet<String, float> *dataSet = new UniqueSet<String, float>();

    KvPair<String, float> parseData(String dataBuffer) const;
    const String messageBuffer;

public:
    void addData(String key, float value) const;
    void addUnparsedData(String dataBuffer) const;

    void removeData(String key) const;
    void clearData() const;
    void printData() const;

    float getData(String key) const;
    String getMessageBuffer() const { return messageBuffer; };
};