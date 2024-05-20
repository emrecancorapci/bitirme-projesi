class Communication
{
  int pin, period;
  char buffer[7], floatBuffer[7];

  void send_byte_to_pin(const char &my_byte)
  {
    // Send low pulse for period
    digitalWrite(pin, LOW);
    delay(period);

    for (int i = 0; i < 8; i++)
    {
      // Send bit for period
      digitalWrite(pin, (my_byte & (0x01 << i)) != 0);
      delay(period);
    }

    digitalWrite(pin, HIGH);
    delay(period);
  }

  void store_float(const char *name, const float &value)
  {
    int width = 4;
    int precision = 3;
    dtostrf(value, width, precision, floatBuffer); // Convert float to string
    sprintf(buffer, "*%s%s", name, floatBuffer);   // Format string
  }
  void store_byte(const char *name, const byte &value)
  {
    sprintf(buffer, "*%s%d", name, value); // Format string
  }
  void store_bool(const char *name, const bool &value)
  {
    sprintf(buffer, "*%s%d", name, value ? "TRUE" : "FLSE"); // Format string
  }
  void store_int(const char *name, const int &value)
  {
    sprintf(buffer, "*%s%d", name, value); // Format string
  }

public:
  Communication(const int &pin, const int &period) : pin(pin), period(period) {}

  void init()
  {
    pinMode(pin, OUTPUT);
  }
  void send_string(const char *string)
  {
    for (int i = 0; i < strlen(string); i++)
    {
      send_byte_to_pin(string[i]);
    }
  }
  void send_float(const char *name, const float &value)
  {
    store_float(name, value);

    for (int i = 0; i < 8; i++)
    {
      send_byte_to_pin(buffer[i]);
    }
  }
  void send_byte(const char *name, const byte &value)
  {
    store_byte(name, value);

    for (int i = 0; i < 8; i++)
    {
      send_byte_to_pin(buffer[i]);
    }
  }
  void send_bool(const char *name, const bool &value)
  {
    store_bool(name, value);

    for (int i = 0; i < 8; i++)
    {
      send_byte_to_pin(buffer[i]);
    }
  }
  void send_char(const char &value)
  {
    send_byte_to_pin(value);
  }
  void send_int(const char *name, const int &value){
    store_int(name, value);
    for (int i = 0; i < 8; i++)
    {
      send_byte_to_pin(buffer[i]);
    }
  }
};
