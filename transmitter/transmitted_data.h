#include <ctime>
#include <string>
#include <vector>

enum ControllerStates
{
    ONLINE,
    STANDBY,
    OFFLINE
};

enum Status
{
    OK,
    WARN,
    ERROR
};

enum SensorDataType
{
    TEMP,
    HUMID,
    LIGHT,
    MOIST,
    CO2,
    ACID
};

struct SensorData
{
    std::string name;
    SensorDataType data_type;
    std::string unit;
    float value;
};

struct Error
{
    std::time_t date;
    int error_code;
    std::string msg;
};

struct RecievedData
{
    std::time_t date;
    ControllerStates controller_state;
    Status status;

    std::vector<Error> errors;
    std::vector<SensorData> data_array;
};