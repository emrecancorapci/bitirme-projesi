#ifndef LIGHT_OPTIMIZER_H
#define LIGHT_OPTIMIZER_H

#define ARRAY_SIZE 20

class AdaptiveLight
{
  int index = 0, light_array[ARRAY_SIZE];
  const float multiplier;

public:
  AdaptiveLight(const int &default_threshold, const float &multiplier) : multiplier(multiplier) {
    memset(light_array, default_threshold, ARRAY_SIZE * sizeof(int));
  }
  void read_light(const int &voltage);
  int get_adaptive_threshold();
};

#endif

void AdaptiveLight::read_light(const int &voltage)
{
  if (index > ARRAY_SIZE)
  {
    index = 0;
  }

  light_array[index++] = voltage;
}

int AdaptiveLight::get_adaptive_threshold()
{
  int sum = 0;

  for (int i = 0; i < ARRAY_SIZE; i++)
  {
    sum += light_array[i];
  }

  return multiplier * sum / ARRAY_SIZE;
}
