class Motor
{
    int pin_low, pin_high;
    bool is_running_ = false;
public:
    Motor(const int &pin_low, const int &pin_high) : pin_low(pin_low), pin_high(pin_high){}
    void init()
    {
        pinMode(pin_high, OUTPUT);
        pinMode(pin_low, OUTPUT);
    }

    void on()
    {
        is_running_ = true;
        digitalWrite(pin_high, HIGH);
        digitalWrite(pin_low, LOW);
    }

    void off()
    {
        is_running_ = false;
        digitalWrite(pin_high, LOW);
        digitalWrite(pin_low, HIGH);
    }

    bool is_running()
    {
        return is_running_;
    }
};
