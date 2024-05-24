#include "relay.h"

class Light
{
  int pin, threshold, value;

public:
  Light(const int &pin) : pin(pin)
  {
  }

  void init();
  void read();
  int get_value();
};

void Light::init()
{
  pinMode(pin, INPUT);
}

void Light::read()
{
  value = analogRead(pin);
}

int Light::get_value()
{
  return value;
}
