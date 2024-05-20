#include "communication_handler.h"
#include "adaptive_light.h"

#define LDR_PIN A0
#define LAMBDA 5            // Must be same with the transmitter

#define STRING_START_CHAR '*'

#define THRESHOLD_MULTIPLIER 1.2
#define DEFAULT_THRESHOLD 300

CommunicationHandler comm_handler(LDR_PIN, LAMBDA);
AdaptiveLight adaptive_light(DEFAULT_THRESHOLD, THRESHOLD_MULTIPLIER);

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  const int voltage = comm_handler.read_voltage();
  adaptive_light.read_light(voltage);

  const int threshold = adaptive_light.get_adaptive_threshold();
  comm_handler.read(threshold);
}
