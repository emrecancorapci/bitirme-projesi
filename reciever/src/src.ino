#include <Vector.h>
#include "lib/kvp.h"
#include "lib/set.h"

void setup() {
  Serial.begin(115200);
}

void dataParser(String dataBuffer) {
  const String dataType = dataBuffer.substring(0, 2);
  const String dataValue = dataBuffer.substring(4, 7);
}

void loop() {
  if(Serial.available() > 0) {
    String buffer = Serial.readString();
  }
}

void establishContact() { 
  while(!Serial) {
    // Wait for connection
  }

  if (Serial.available() <= 0) {
    Serial.print('Contact Established!');
    delay(300);
  }
}

class DataHelper {
  private:
    Vector<Kvp<String, float>> data;


};
