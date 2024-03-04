#include "lib/set.h"

class DataStorage
{
private:
    static DataStorage *dataStoragePointer;
    DataStorage() {}

    Set<String, float> *dataSet = new Set<String, float>();
    Kvp<String, float> parseData(String dataBuffer);

public:
    DataStorage(const DataStorage &obj) = delete;
    void operator=(const DataStorage &obj) = delete;

    static DataStorage *getInstance();
    void addData(String key, float value);
    void addUnparsedData(String dataBuffer);
    void removeData(String key);
    void clearData();

    float getData(String key);
};