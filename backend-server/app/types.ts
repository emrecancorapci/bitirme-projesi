import { ObjectId } from 'mongodb';

export interface SensorData {
  sensorName: string;
  value: number;
}

export interface DataObject {
  sensorData: SensorData[];
  dateStart: Date;
  dateEnd: Date;
  id?: ObjectId;
}

export interface DatabaseSensorData {
  id: number;
  value: number;
}

export interface Sensor {
  id: number;
  name: string;
  short: string;
}

export interface DataChunkRequest {
  date: Date;
  sensorData: SensorData[];
}
