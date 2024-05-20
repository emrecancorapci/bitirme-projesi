#include "config.h"
#include "dht.h"
#include "communication.h"
#include "motor.h"
#include "gnd_hum.h"
#include "relay.h"
#include "air.h"
#include "ph.h"
#include "light.h"

Communication comm = Communication(PIN_COMM, PERIOD);

GroundHumidity gnd_hum = GroundHumidity(APIN_GROUND_HUMIDITY, GROUND_HUMIDITY_THRESHOLD_HIGH, GROUND_HUMIDITY_THRESHOLD_LOW);
AirQuality air = AirQuality(PIN_MQ135, APIN_MQ135, MQ135_THRESHOLD);
DHTReader dht = DHTReader(PIN_DHT, TEMPERATURE_THRESHOLD);
PH ph = PH(APIN_PH);
Light light = Light(APIN_LDR, LIGHT_THRESHOLD, PIN_RELAY);

Motor motor = Motor(PIN_MOTOR_LOW, PIN_MOTOR_HIGH);

void setup()
{
  comm.init();
  air.init();
  Serial.begin(9600);
}

void loop()
{
  read_sensors();
  control_motors();
  send_values();

  delay(COMM_DELAY);
}

void control_motors() {
  if (!gnd_hum.is_in_threshold()) {
    motor.on();
  } else {
    motor.off();
  }
}

void read_sensors() {
  dht.read();
  air.read();
  gnd_hum.read();
  ph.read();
  light.read();
}

void send_values() {
  comm.send_float(TAG_TEMP, dht.get_temp()); // Temperature (C)
  comm.send_byte(TAG_HUMIDITY, dht.get_humidity()); // Humidity (%)
  comm.send_float(TAG_PH, ph.get_value()); // PH
  comm.send_byte(TAG_GROUND_HUMIDITY, gnd_hum.get_value()); // Ground Humidity (%)
  comm.send_byte(TAG_AIR_QUALITY, air.get_value()); // Air Quality (ppm)
  comm.send_int(TAG_LIGHT, light.get_value()); // Light
}