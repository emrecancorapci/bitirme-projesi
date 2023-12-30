#include <string>
#include "data_handler.h"

void DataHandler::add_data(std::string data){
    v_recieved_data.push_back(data);
};
void DataHandler::send_data(){
    DataHandler::parse_data();
    // TODO: send data to server through http request
};

void DataHandler::parse_data(){
    // TODO: parse data
};
