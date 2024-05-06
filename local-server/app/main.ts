import axios, { AxiosError } from 'axios';
import * as dotenv from 'dotenv';
import { SerialPort } from 'serialport';

import { SensorData } from './types';

dotenv.config();

async function onSensorData(data: string): Promise<void> {
  const sensorData = data.toString().split(':');
  if (sensorData.length !== 2) return console.error('Invalid data format:', sensorData);

  const sensorObject: SensorData = {
    sensorId: sensorData[0],
    value: Number.parseFloat(sensorData[1]),
    date: new Date(),
  };

  const API_URL = process.env.API_URL;
  if (!API_URL) throw new Error('API_URL is not defined');

  await axios
    .post(API_URL + '/sensor-data', sensorObject)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error: AxiosError) => {
      console.error(error.message);
    });
}

const serialport = new SerialPort({ path: 'COM3', baudRate: 9600 });
serialport.on('data', (data: string) => void onSensorData(data));

serialport.on('error', (error) => {
  console.error(error);
});

serialport.on('open', () => {
  console.log('Serial port opened');
});

serialport.on('close', () => {
  console.log('Serial port closed');
});
