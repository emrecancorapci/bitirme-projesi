#include "config.h"

class GroundHumidity
{
    int _pin, _threshold_high, _threshold_low;
    int value = 0;

public:
    GroundHumidity(const int &pin, const int &threshold_high, const int &threshold_int){
        _pin = pin;
        _threshold_high = threshold_high;
        _threshold_low = threshold_int;
    }
    void read()
    {
        value = analogRead(_pin);
        value = map(value, 0, 1023, 0, 100);
    }

    bool is_in_threshold()
    {
        return value < _threshold_high && value > _threshold_low;
    }

    int get_value()
    {
        return value;
    }
};