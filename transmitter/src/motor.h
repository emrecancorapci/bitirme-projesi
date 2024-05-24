class Motor
{
    int pin_low, pin_high;

public:
    Motor(const int &pin_high, const int &pin_low) : pin_low(pin_low), pin_high(pin_high) {}
    void init()
    {
        pinMode(pin_high, OUTPUT);
        pinMode(pin_low, OUTPUT);
    }

    void set(const bool &mode)
    {
        digitalWrite(pin_high, mode ? HIGH : LOW);
        digitalWrite(pin_low, LOW);
    }
};
