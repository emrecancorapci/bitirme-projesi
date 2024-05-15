#include "config.h"

class Motor
{
    bool is_running_ = false;
public:
    void init()
    {
        pinMode(PIN_MOTOR_HIGH, OUTPUT);
        pinMode(PIN_MOTOR_LOW, OUTPUT);
    }

    void on()
    {
        is_running_ = true;
        digitalWrite(PIN_MOTOR_HIGH, HIGH);
        digitalWrite(PIN_MOTOR_LOW, LOW);
    }

    void off()
    {
        is_running_ = false;
        digitalWrite(PIN_MOTOR_HIGH, LOW);
        digitalWrite(PIN_MOTOR_LOW, HIGH);
    }

    bool is_running()
    {
        return is_running_;
    }
};
