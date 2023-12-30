#include "../fake_arduino.h"
#include "../config.h"

void setup()
{
    Serial.begin(BAUD_RATE);
    Serial1.begin(BAUD_RATE);
}

void loop()
{

}