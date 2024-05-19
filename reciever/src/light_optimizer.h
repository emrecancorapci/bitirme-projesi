#ifndef LIGHT_OPTIMIZER_H
#define LIGHT_OPTIMIZER_H

#define ARRAY_SIZE 20
#define START_THRESHOLD 300

class LightOptimizer
{
  int index = 0, light_array[ARRAY_SIZE];

public:
  LightOptimizer() {
    memset(light_array, START_THRESHOLD, ARRAY_SIZE * sizeof(int));
  }
  void read_light(const int &voltage);
  int get_average();
};

#endif

void LightOptimizer::read_light(const int &voltage)
{
  if (index > ARRAY_SIZE)
  {
    index = 0;
  }

  light_array[index++] = voltage;
}

int LightOptimizer::get_average()
{
  int sum = 0;

  for (int i = 0; i < ARRAY_SIZE; i++)
  {
    sum += light_array[i];
  }

  return sum / ARRAY_SIZE;
}
