class Relay
{
    int pin;
public:
    Relay(const int &pin) : pin(pin){}
    void init()
    {
        pinMode(pin, OUTPUT);
    }

    void on() {
        digitalWrite(pin, HIGH);
    }

    void off() {
        digitalWrite(pin, LOW);
    }
};
