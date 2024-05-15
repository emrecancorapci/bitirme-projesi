// Digital pins
#define PIN_DHT 4
#define PIN_MOTOR_HIGH 5
#define PIN_MOTOR_LOW 6
#define PIN_MQ135 7
#define PIN_RELAY 12
#define PIN_COMM 13

// Analog pins
#define APIN_GROUND_HUMIDITY A0
#define APIN_MQ135 A1

// Constants
#define GROUND_HUMIDITY_THRESHOLD_LOW 70
#define GROUND_HUMIDITY_THRESHOLD_HIGH 100
#define MQ135_THRESHOLD 100
#define TEMPERATURE_THRESHOLD 22.00

// Communication
#define PERIOD 5 // Lesser than 5 ms does not work with photoresistor
#define COMM_DELAY 1000 // Delay between sending data
