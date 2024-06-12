export interface DatabaseSensorData {
  id: number;
  time: number;
  tp: number | null;
  hd: number | null;
  ph: number | null;
  gh: number | null;
  aq: number | null;
  lt: number | null;
}

export interface DatabaseSensor {
  id: number;
  name: string;
  short: string | null;
  unit: string | null;
}

export interface SensorData {
  time: number | string;
  tp: number | null;
  hd: number | null;
  ph: number | null;
  gh: number | null;
  aq: number | null;
  lt: number | null;
}

export type ErrorResponse = { message: string };
