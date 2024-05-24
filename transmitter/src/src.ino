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

GroundHumidity gnd_hum = GroundHumidity(APIN_GROUND_HUMIDITY);
AirQuality air = AirQuality(PIN_MQ135, APIN_MQ135, MQ135_THRESHOLD);
DHTReader dht = DHTReader(PIN_DHT);
PH ph = PH(APIN_PH);
Light light = Light(APIN_LDR);

Motor motor = Motor(PIN_MOTOR_LOW, PIN_MOTOR_HIGH);
Relay relay_fan = Relay(PIN_RELAY_FAN);
Relay relay_light = Relay(PIN_RELAY_LIGHT);

void setup()
{
  Serial.begin(9600);
  relay_fan.init();
  relay_light.init();
  light.init();
  comm.init();
  air.init();
  ph.init();
}

void loop()
{
  read_sensors();
  control_motors();
  send_values();

  delay(COMM_DELAY);
}

void read_sensors()
{
  dht.read();
  air.read();
  gnd_hum.read();
  ph.read_average();
  light.read();
}

void control_motors()
{
  const int ground_humidity = gnd_hum.get_value();
  const int dht_temperature = dht.get_temp();
  const int enviroment_light = light.get_value();

  bool is_gh_threshold_passed = ground_humidity > GROUND_HUMIDITY_THRESHOLD;
  bool is_temperature_passed = dht_temperature > TEMPERATURE_THRESHOLD;
  bool is_light_threshold_passed = enviroment_light > LIGHT_THRESHOLD;

  motor.set(is_gh_threshold_passed);
  relay_fan.set(is_temperature_passed);
  relay_light.set(is_light_threshold_passed);
}

void send_values()
{
  comm.send_float(TAG_TEMP, dht.get_temp());               // Temperature (C)
  comm.send_byte(TAG_HUMIDITY, dht.get_humidity());        // Humidity (%)
  comm.send_float(TAG_PH, ph.get_value());                 // PH
  comm.send_int(TAG_GROUND_HUMIDITY, gnd_hum.get_value()); // Ground Humidity (%)
  comm.send_byte(TAG_AIR_QUALITY, air.get_value());        // Air Quality (ppm)
  comm.send_int(TAG_LIGHT, light.get_value());             // Light
}
