import axios, { AxiosError } from 'axios';
import * as dotenv from 'dotenv';
import { SerialPort } from 'serialport';

import { postSensorData } from './sensor-data.controller';

dotenv.config();

  const API_URL = process.env.API_URL;
  if (!API_URL) throw new Error('API_URL is not defined');


const serialport = new SerialPort({ path: 'COM3', baudRate: 9600 });
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
