#ifndef RELAY_H
#define RELAY_H

class Relay
{
    int pin;
public:
    Relay(const int &pin) : pin(pin){}
    void init()
    {
        pinMode(pin, OUTPUT);
    }

    void set(const bool &state) {
        digitalWrite(pin, state ? HIGH : LOW);
    }
};

#endif
