export interface DatabaseSensorData {
  id: number;
  sensorId: number;
  value: number;
  time: number;
}

export interface DatabaseSensor {
  id: number;
  name: string;
  short: string | null;
  unit: string | null;
}

export interface SensorData {
  sensorId: number;
  value: number;
  time: number;
}
