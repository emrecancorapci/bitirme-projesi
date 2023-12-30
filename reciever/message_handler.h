#include <string>

class MessageHandler {
private:
    std::string message;

    void add_char(char c);
    void clear_message();
public:
    void read_message(_Serial serial);
    std::string get_message();
};