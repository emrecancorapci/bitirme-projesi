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
