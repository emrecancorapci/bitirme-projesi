import * as dotenv from 'dotenv';
import { SerialPort } from 'serialport';

import getSerialPortConfig from './helpers/get-serial-port-config';
import { postSensorData } from './sensor-data.controller';

dotenv.config();

const API_URL = process.env.API_URL;
if (!API_URL) throw new Error('API_URL is not defined');

const serialPortConfig = getSerialPortConfig();

const serialport = new SerialPort(serialPortConfig);
serialport.on('data', (data: string) => void postSensorData(data, API_URL));

serialport.on('error', (error) => {
  console.error(error);
});

serialport.on('open', () => {
  console.log('Serial port opened');
});

serialport.on('close', () => {
  console.log('Serial port closed');
});
