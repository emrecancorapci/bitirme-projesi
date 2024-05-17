export interface SensorData {
  id: number;
  value: number;
}

export interface DataChunk {
  date: Date;
  sensorData: SensorData[];
}
