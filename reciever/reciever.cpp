#include "../fake_arduino.h"
#include "../config.h"
#include "message_handler.h"


MessageHandler message_handler;

void setup()
{
    Serial.begin(BAUD_RATE);
    Serial1.begin(BAUD_RATE);
}

void loop()
{
    while (Serial1.available() > 0)
    {
        message_handler.read_message(Serial1);
    }
}