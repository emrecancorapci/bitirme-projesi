/**
 * Class to read the air quality sensor (MQ135)
 *
 * @class AirQuality
 */
class AirQuality
{
private:
    int ppm = 0;
    int current_threshold = 0;
    int pin, analog_pin, threshold;

public:
    AirQuality(const int &pin, const int &analog_pin, const int &threshold) : pin(pin), analog_pin(analog_pin), threshold(threshold) {}
    /**
     * Initialize the sensor and set the pin mode
     */
    void init()
    {
        pinMode(pin, INPUT);
    }

    /**
     * Read the sensor and store the value
     */
    void read()
    {
        ppm = analogRead(analog_pin);
        current_threshold = digitalRead(pin);
    }

    /**
     * Check if the value passed the threshold
     */
    bool is_high()
    {
        return current_threshold > threshold;
    }

    /**
     * Get the value of the sensor
     */
    int get_value()
    {
        return ppm;
    }
};