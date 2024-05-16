export interface SensorData {
  sensorName: string;
  value: number;
}

export interface DataObject {
  sensorData: SensorData[];
  dateStart: Date;
  dateEnd: Date;
}

export interface TemporaryDatabase {
  dateStart?: Date;
  dateEnd?: Date;
  data: TemporaryDataChunk[];
}

export interface TemporaryDataChunk {
  date: Date;
  sensorData: SensorData[];
}
