import { SensorData } from './types';

export async function postSensorData(data: string, uri: string): Promise<void> {
  const sensorData = data.toString().split(':');
  if (sensorData.length !== 2) return console.error('Invalid data format:', sensorData);

  const sensorObject: SensorData = {
    sensorId: sensorData[0],
    value: Number.parseFloat(sensorData[1]),
    date: new Date(),
  };

  await fetch(`${uri}/sensor-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sensorObject),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error: Error) => console.error(error));
}
