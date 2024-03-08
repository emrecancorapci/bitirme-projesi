class DataController
{
private:
    char buffer[8];                                        // Buffer to store formatted string
    char floatBuffer[8];                                   // Buffer to store float as string
    void storeValue(const char *name, const float &value); // Format and store value in buffer
    void sendValue();                                      // Send value to serial
    void cleanBuffers();                                   // Clean buffer

public:
    DataController(){}; // Constructor

    void sendData(const char *name, const float &value); // Send data to serial
};