#pragma once

#include <Vector.h>
#include "./kvp.h"

template <class Key, class Value>
class Set {
  private:
    Vector<Kvp<Key, Value>> data = Vector<Kvp<Key, Value>>();
    
    void checkIfKeyExists(Key key);

  public:
    void add(Key key, Value value);
    void remove(Key key);
    void clear();

    Value get(Key key);
};
