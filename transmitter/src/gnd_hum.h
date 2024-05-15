#include "config.h"

class GroundHumidity
{
    int value = 0;

public:
    void read()
    {
        value = analogRead(APIN_GROUND_HUMIDITY);
        value = map(value, 0, 1023, 0, 100);
    }

    bool is_in_threshold()
    {
        return value < GROUND_HUMIDITY_THRESHOLD_HIGH && value > GROUND_HUMIDITY_THRESHOLD_LOW;
    }

    int get_value()
    {
        return value;
    }
};