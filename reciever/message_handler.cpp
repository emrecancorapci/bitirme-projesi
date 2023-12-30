#include "message_handler.h"

#include "../fake_arduino.h"

void MessageHandler::read_message(_Serial serial)
{
    char receivedChar = serial.read();
    if (receivedChar == '\n')
    {
        Serial.println(get_message());
        clear_message();
    }
    else
    {
        add_char(receivedChar);
    }
};

void MessageHandler::add_char(char c)
{
    message += c;
};
void MessageHandler::clear_message()
{
    message = "";
};
std::string MessageHandler::get_message()
{
    return message;
};