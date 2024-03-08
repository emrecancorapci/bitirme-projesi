#pragma once

#include <Arduino.h>
#include <Vector.h>
#include "kv-pair.h"

template <typename Key, typename Value>
class UniqueSet
{
private:
  Vector<KvPair<Key, Value>> data = Vector<KvPair<Key, Value>>();
  String buffer;

  bool checkIfKeyExists(const Key& key);

public:
  Set(){};

  void push(const Key& key, const Value& value);
  void push(const KvPair<Key, Value>& KvPair);
  void remove(const Key& key);
  void clear();
  void print();

  Value get(const Key& key);
  String getBuffer() const { return buffer; }
  Value operator[](const Key& key);
};

template <typename Key, typename Value>
void UniqueSet<Key, Value>::push(const Key& key, const Value& value)
{
    KvPair<Key, Value> kvp = KvPair<Key, Value>(key, value);

    if (checkIfKeyExists(key))
    {
        for (int i = 0; i < data.size(); i++)
        {
            if (data[i].key == key)
            {
                data[i].value = value;
            }
        }
    }
    else
    {
        data.push_back(kvp);
    }
}

template <typename Key, typename Value>
inline void UniqueSet<Key, Value>::push(const KvPair<Key, Value>& kvp)
{
    if (checkIfKeyExists(kvp.key))
    {
        for (int i = 0; i < data.size(); i++)
        {
            if (data[i].key == kvp.key)
            {
                data[i].value = kvp.value;
            }
        }
    }
    else
    {
        data.push_back(kvp);
    }
}

template <typename Key, typename Value>
void UniqueSet<Key, Value>::remove(const Key& key)
{
    for (int i = 0; i < data.size(); i++)
    {
        if (data[i].key == key)
        {
            data.remove(i);
        }
    }
}

template <typename Key, typename Value>
void UniqueSet<Key, Value>::clear()
{
    data.clear();
}

template <typename Key, typename Value>
Value UniqueSet<Key, Value>::get(const Key& key)
{
    for (int i = 0; i < data.size(); i++)
    {
        if (data[i].key == key)
        {
            return data[i].value;
        }
    }
}

template <typename Key, typename Value>
inline void UniqueSet<Key, Value>::print()
{
    for (int i = 0; i < data.size(); i++)
    {
        buffer += data[i].key;
        buffer += ": ";
        buffer += data[i].value;

        Serial.print(data[i].key);
        Serial.print(": ");
        Serial.println(data[i].value);
    }
}

template <typename Key, typename Value>
bool UniqueSet<Key, Value>::checkIfKeyExists(const Key& key)
{
    for (int i = 0; i < data.size(); i++)
    {
        if (data[i].key == key)
        {
            return true;
        }
    }
    return false;
}

template <typename Key, typename Value>
inline Value UniqueSet<Key, Value>::operator[](const Key& key)
{
    return get(key);
}
