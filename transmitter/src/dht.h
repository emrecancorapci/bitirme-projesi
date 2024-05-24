#include <SimpleDHT.h>

class DHTReader
{
  byte dhtTemp = 0;
  byte dhtHumid = 0;

  SimpleDHT11 dht;

public:
  DHTReader(const int &pin){
    dht = SimpleDHT11(pin);
  }

  void read()
  {
    int err = SimpleDHTErrSuccess;
    if ((err = dht.read(&dhtTemp, &dhtHumid, NULL)) != SimpleDHTErrSuccess)
    {
      Serial.print("ERR_DHT-");
      Serial.print(SimpleDHTErrCode(err));
      Serial.print(",");
      Serial.println(SimpleDHTErrDuration(err));
      return;
    }
  }

  byte get_temp()
  {
    return dhtTemp;
  }

  byte get_humidity()
  {
    return dhtHumid;
  }
  
};
