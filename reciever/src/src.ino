#define LDR_PIN A0
#define LIGHT_THRESHOLD 100 // Depends on the light intensity of the room
#define LAMBDA 5 // Must be same with the transmitter

#define START_CHAR '*'
#define START_STRING "=START="

bool previous_state;
bool current_state;

int index = 0;
char buffer[7];
char bufferList[20][7];

int index2 = 0;
int light_intensities[20];

void setup() {
  Serial.begin(9600);
}

void loop() {
  current_state = read_comm();

  if (!current_state && previous_state) {
    char byte_received = get_byte();
    fill_buffer(byte_received);
  }

  previous_state = current_state;
}

bool read_comm() {
  int voltage = analogRead(LDR_PIN);
  light_intensities[index2] = voltage;
  index2++;
  if (index2 > 19) {
    index2 = 0;
  }
  return voltage > LIGHT_THRESHOLD ? true : false;
}

char get_byte() {
  char character = 0;
  delay(LAMBDA * 1.5);
  for (int i = 0; i < 8; i++) {
    character = character | read_comm() << i;
    delay(LAMBDA);
  }
  return character;
}

void fill_buffer(const char& ch) {
  if(ch == START_CHAR) {
    index = 0;
    if(buffer == START_STRING) { 
      print_buffer_list();
      empty_buffer_list();
    }
  } else if(index < 7) {
    buffer[index] = ch;
    index++;
  } else {
    Serial.println("ERR: Buffer is full");
  }
}

void print_buffer_list() {
  for(int i = 0; i < 20; i++) {
    Serial.print(bufferList[i]);
    Serial.print("\r\n");
  }
}

void empty_buffer_list() {
  for(int i = 0; i < 20; i++) {
    bufferList[i][0] = '\0';
  }
}