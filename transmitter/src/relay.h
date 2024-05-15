#include "config.h"

class Relay
{
public:
    void init()
    {
        pinMode(PIN_RELAY, OUTPUT);
    }

    void on() {
        digitalWrite(PIN_RELAY, HIGH);
    }

    void off() {
        digitalWrite(PIN_RELAY, LOW);
    }
};
