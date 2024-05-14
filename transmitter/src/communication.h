#include "config.h"

class Communication
{
  static char buffer[7];
  static char floatBuffer[7];

  static inline void send_byte(char my_byte)
  {
    digitalWrite(PIN_LED, LOW);
    delay(PERIOD);

    for (int i = 0; i < 8; i++)
    {
      digitalWrite(PIN_LED, (my_byte & (0x01 << i)) != 0);
      delay(PERIOD);
    }

    digitalWrite(PIN_LED, HIGH);
    delay(PERIOD);
  }

  static inline void storeValue(const char *name, const float &value)
  {
    int width = 4;
    int precision = 3;
    dtostrf(value, width, precision, floatBuffer);  // Convert float to string
    sprintf(buffer, "*%s%s", name, floatBuffer);    // Format string
  }

public:
  static void send_string(const char *name, const float &value)
  {
    storeValue(name, value);

    for (int i = 0; i < 8; i++)
    {
      send_byte(buffer[i]);
    }
  }
};
