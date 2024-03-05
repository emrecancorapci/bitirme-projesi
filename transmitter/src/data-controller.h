class DataController
{
private:
    static DataController *_dataController; // Singleton instance of DataController
    DataController() {}                     // Private constructor

    char buffer[8];                                 // Buffer to store formatted string
    char floatBuffer[8];                            // Buffer to store float as string
    void storeValue(const char *name, float value); // Format and store value in buffer
    void sendValue();                               // Send value to serial
    void cleanBuffers();                            // Clean buffer

public:
    static DataController *getInstance();            // Get instance of DataController
    DataController(DataController &obj) = delete;    // Delete copy constructor
    void operator=(const DataController &) = delete; // Delete assignment operator

    void sendData(const char *name, float value); // Send data to serial
};