#include "./set.h"
#include "set.h"

template <class Key, class Value>
void Set<Key, Value>::checkIfKeyExists(Key key)
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

template <class Key, class Value>
void Set<Key, Value>::add(Key key, Value value)
{
  Kvp<Key, Value> kvp;
  kvp.key = key;
  kvp.value = value;

  if (checkIfKeyExists(key))
  {
    for (int i = 0; i < data.size(); i++)
    {
      if (data[i].key == key)
      {
        data[i].value = value;
      }
    }

    checkIfKeyExists(key) ? data.push_back(kvp) : Serial.println("Key already exists");
  }
}

template <class Key, class Value>
void Set<Key, Value>::remove(Key key)
{
  for (int i = 0; i < data.size(); i++)
  {
    if (data[i].key == key)
    {
      data.erase(data.begin() + i);
    }
  }
}

template<class Key, class Value>
void Set<Key, Value>::clear()
{
  data.clear();
}

template <class Key, class Value>
Value Set<Key, Value>::get(Key key)
{
  for (int i = 0; i < data.size(); i++)
  {
    if (data[i].key == key)
    {
      return data[i].value;
    }
  }
}

template <class Key, class Value>
void Set<Key, Value>::checkIfKeyExists(Key key)
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
