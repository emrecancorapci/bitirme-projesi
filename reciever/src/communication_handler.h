#ifndef COMMUNICATION_HANDLER_H
#define COMMUNICATION_HANDLER_H

#define STRING_START_CHAR '*'
#define ARRAY_START_CHAR '&'

#define BUFFER_SIZE 7
#define LIST_SIZE 20

class CommunicationHandler
{
  const int LAMBDA, PIN;
  bool previous_state;

  int current_voltage, threshold;
  int buffer_index = 0, list_index = 0;

  char buffer[BUFFER_SIZE];
  char dataArray[LIST_SIZE][BUFFER_SIZE];

  char read_byte();
  void fill_buffer(const char recieved_byte);
  void print_data_array();
  void push_to_data_array();

public:
  CommunicationHandler(const int &pin, const int &lambda) : PIN(pin), LAMBDA(lambda) {}
  void read(const int &threshold);
  int read_voltage();
};

#endif

// Public methods

/**
 * Read the voltage from the analog pin
 * 
 * If the current state is below the threshold and the previous state is above the threshold (01), read the byte
 * 
 * @param threshold `int` The threshold value to compare the current voltage 
*/
void CommunicationHandler::read(const int &threshold)
{
  const bool current_state = current_voltage > threshold;

  if (!current_state && previous_state)
  {
    const char recieved_byte = read_byte();
    fill_buffer(recieved_byte);
  }

  previous_state = current_state;
}
int CommunicationHandler::read_voltage()
{
  current_voltage = analogRead(PIN);

  return current_voltage;
}

// Private methods

/**
 * Read the byte from the analog pin
*/
char CommunicationHandler::read_byte()
{
  char recieved_byte = 0;
  delay(LAMBDA * 1.5);
  for (int i = 0; i < 8; i++)
  {
    recieved_byte = recieved_byte | read_voltage() << i;
    delay(LAMBDA);
  }

  return recieved_byte;
}
/**
 * Fill the buffer with the recieved byte
 * 
 * If the recieved byte is `STRING_START_CHAR`, push the buffer to the data array
 * 
 * If the recieved byte is `ARRAY_START_CHAR`, print the data array
 * 
 * If the buffer is full, print an error message
*/
void CommunicationHandler::fill_buffer(const char recieved_byte)
{
  if (recieved_byte == STRING_START_CHAR)
  {
    buffer_index = 0;
    push_to_data_array();
  }
  else if (recieved_byte == ARRAY_START_CHAR)
  {
    print_data_array();
  }
  else if (buffer_index < BUFFER_SIZE)
  {
    buffer[buffer_index] = recieved_byte;
    buffer_index++;
  }
  else
  {
    Serial.println("ERR: Buffer is full");
  }
}
/**
 * Print the buffer list then empty it
*/
void CommunicationHandler::print_data_array()
{
  for (int i = 0; i < LIST_SIZE; i++)
  {
    // Print the buffer
    Serial.print(dataArray[i]);
    Serial.print("\r\n");
    // Clean the buffer
    dataArray[i][0] = 0;

  }
}
void CommunicationHandler::push_to_data_array()
{
  for (int i = 0; i < LIST_SIZE; i++)
  {
    dataArray[list_index][i] = buffer[i];
  }
  list_index++;
}
