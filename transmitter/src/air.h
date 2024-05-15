#include "config.h"

/**
 * Class to read the air quality sensor (MQ135)
 * 
 * @class Air
*/
class Air
{
private:
    int ppm = 0;
    int threshold = 0;

public:
    /**
     * Initialize the sensor and set the pin mode
    */
    void init()
    {
        pinMode(PIN_MQ135, INPUT);
    }

    /**
     * Read the sensor and store the value
    */
    void read()
    {
        ppm = analogRead(APIN_MQ135);
        threshold = digitalRead(PIN_MQ135);
    }

    /**
     * Check if the value passed the threshold
    */
    bool is_high()
    {
        return threshold > MQ135_THRESHOLD;
    }

    /**
     * Get the value of the sensor
    */
    int get_value()
    {
        return ppm;
    }
};