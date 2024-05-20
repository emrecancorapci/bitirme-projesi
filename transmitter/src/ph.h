class PH
{
  int pin;
  float value;

public:
  PH(const int &pin) : pin(pin) {}
  void init();
  void read();
  void read_average();
  float get_value() { return value; }
};

void PH::init()
{
  pinMode(pin, INPUT);
}

void PH::read()
{
  int read = analogRead(pin);
  value = (float)read * 5.0 / 1024 / 6 * 3.5;
}

void PH::read_average()
{
  int buf[10], temp;
  for (int i = 0; i < 10; i++)
  {
    buf[i] = analogRead(pin);
    delay(10);
  }

  int avgValue = 0;
  for (int i = 2; i < 8; i++)
  {
    avgValue += buf[i];
  }

  value = (float)avgValue * 5.0 / 1024 / 6 * 3.5;
}
