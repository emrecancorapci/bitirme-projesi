class Motor
{
    int pin_low, pin_high;
    bool current_state = false;
public:
    Motor(const int &pin_high, const int &pin_low) : pin_low(pin_low), pin_high(pin_high) {}
    void init()
    {
        pinMode(pin_high, OUTPUT);
        pinMode(pin_low, OUTPUT);
    }

    void set(const bool &state)
    {
        if (current_state == state) return;

        current_state = state;
        digitalWrite(pin_high, state ? HIGH : LOW);
        digitalWrite(pin_low, LOW);
    }
};
