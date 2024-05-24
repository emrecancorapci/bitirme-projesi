// Digital pins
#define PIN_RELAY_LIGHT 3
#define PIN_MOTOR_HIGH 5
#define PIN_MOTOR_LOW 6
#define PIN_MQ135 7
#define PIN_DHT 8
#define PIN_RELAY_FAN 12
#define PIN_COMM 13

// Analog pins
#define APIN_GROUND_HUMIDITY A0
#define APIN_LDR A2
#define APIN_MQ135 A3
#define APIN_PH A5

// Constants
#define GROUND_HUMIDITY_THRESHOLD 80
#define MQ135_THRESHOLD 100
#define TEMPERATURE_THRESHOLD 22
#define LIGHT_THRESHOLD 30

// Communication
#define PERIOD 5 // Lesser than 5 ms does not work with photoresistor
#define COMM_DELAY 1000 // Delay between strings
#define ARRAY_START_CHAR '&'

// Data tags
#define TAG_TEMP "TP"
#define TAG_HUMIDITY "HD"
#define TAG_GROUND_HUMIDITY "GH"
#define TAG_AIR_QUALITY "AQ"
#define TAG_GH_PASSED "GT"
#define TAG_MOTOR_RUNNING "MT"
#define TAG_PH "PH"
#define TAG_LIGHT "LT"
