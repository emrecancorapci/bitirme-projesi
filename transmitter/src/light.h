#include "relay.h"
#define ldr A0
#define role 3

class Light
{
  Relay *relay;
  int pin, threshold, value;

public:
  Light(const int &pin, const int &threshold, const int &relay_pin) : pin(pin), threshold(threshold)
  {
    relay = new Relay(relay_pin);
  }

  void init();
  void read();
  int get_value();
  Relay *get_relay();
};

void Light::init()
{
  pinMode(pin, INPUT);
  relay->init();
}

void Light::read()
{
  value = analogRead(pin);
  if (value <= threshold)
  {
    relay->on();
  }
  else
  {
    relay->off();
  }
}

int Light::get_value()
{
  return value;
}

Relay *Light::get_relay() { return relay; }