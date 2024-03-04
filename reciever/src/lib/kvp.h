#pragma once

template <class Key, class Value>
struct Kvp {
  Key key;
  Value value;

  Kvp(Key key, Value value) {
    this->key = key;
    this->value = value;
  }
};