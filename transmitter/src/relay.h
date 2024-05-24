#ifndef RELAY_H
#define RELAY_H

class Relay
{
    int pin;
    bool current_state = false;
public:
    Relay(const int &pin) : pin(pin){}
    void init()
    {
        pinMode(pin, OUTPUT);
    }

    void set(const bool &state) {
        if (current_state == state) return;

        current_state = state;
        digitalWrite(pin, state ? HIGH : LOW);
    }
};

#endif
