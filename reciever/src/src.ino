#include "communication_handler.h"
#include "light_optimizer.h"

#define LDR_PIN A0
#define LAMBDA 5            // Must be same with the transmitter

#define STRING_START_CHAR '*'
#define ARRAY_START_CHAR '&'

CommunicationHandler commHandler(LDR_PIN, LAMBDA);
LightOptimizer lightOptimizer;

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  const int voltage = commHandler.read_voltage();
  lightOptimizer.read_light(voltage);

  const int threshold = lightOptimizer.get_average();
  commHandler.read(threshold);
}
