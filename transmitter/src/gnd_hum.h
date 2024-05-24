#include "config.h"

class GroundHumidity
{
    int pin;
    int value = 0;

public:
    GroundHumidity(const int &pin): pin(pin){}
    void read()
    {
        int temp = analogRead(pin);
        value = map(temp, 0, 1023, 0, 100);
    }

    int get_value()
    {
        return value;
    }
};
