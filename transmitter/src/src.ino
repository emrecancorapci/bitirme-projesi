#include "config.h"
#include "dht.h"
#include "communication.h"
#include "motor.h"
#include "gnd_hum.h"
#include "relay.h"
#include "air.h"

DHTReader dht;
Communication comm;
GroundHumidity gnd_hum;
AirQuality air;

Relay relay;
Motor motor;

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
  if (dht.temp_passed_threshold()) {
    relay.on();
  } else {
    relay.off();
  }
}

void read_sensors() {
  dht.read();
  air.read();
  gnd_hum.read();
}

void send_values() {
  comm.send_string("SENSORS"); 
  comm.send_float("TP", dht.get_temp()); // Temperature (C)
  comm.send_byte("HD", dht.get_humidity()); // Humidity (%)
  comm.send_byte("GH", gnd_hum.get_value()); // Ground Humidity (%)
  comm.send_byte("AQ", air.get_value()); // Air Quality (ppm)
  comm.send_bool("GT", gnd_hum.is_in_threshold()); // Ground Humidity in threshold
  comm.send_bool("MT", motor.is_running()); // Motor running
}