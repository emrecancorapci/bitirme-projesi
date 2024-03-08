#pragma once

template <class Key, class Value>
struct KvPair
{
  Key key;
  Value value;

  KvPair() {}
  KvPair(const Key& _key, const Value& _value);
};

template <class Key, class Value>
inline KvPair<Key, Value>::KvPair(const Key &_key, const Value &_value)
{
    key = _key;
    value = _value;
}