#include <vector>
#include <string>

class DataHandler {
private:
    std::vector<std::string> v_recieved_data;

    void parse_data();

public:
    void add_data(std::string data);
    void send_data();
};