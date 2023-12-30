#include <string>

// fake arduino library for testing

class _Serial {
public:
    void begin(int baud_rate);
    void println(std::string msg);
    bool available();
    char read();
};

_Serial Serial;
_Serial Serial1;