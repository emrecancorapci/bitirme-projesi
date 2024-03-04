#include <Vector.h>

void formatSensorValue(char buffer[8], const char* name, float value)
{
    char floatBuffer[8];

    dtostrf(value, 4, 3, floatBuffer); // Convert float to string
    sprintf(buffer, "%s:%s", name, floatBuffer); // Format string
}

void setup() {
  Serial.begin(9600);
}

void loop() {
  if(Serial.availableForWrite() > 0) {
    float humidity = 3.4567;
    char* name = "HUM";
    char buffer[8];

    formatSensorValue(buffer, name, humidity);

    Serial.println(buffer);
  }
}

void establishContact() { 
  while(!Serial) {
    // Wait for connection
  }

  if (Serial.availableForWrite() <= 0) {
    Serial.print('Contact Established!');
    delay(300);
  }
}
