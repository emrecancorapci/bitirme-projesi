import { SensorData } from './types';

let temporaryDatabase: SensorData[] = [];

const FETCH_LIMIT = 100;

export async function postSensorData(data: string, uri: string): Promise<void> {
  const rawSensorData = data.toString().split('\r\n');

  if (rawSensorData.length < 2) return console.error('Invalid data format:', data);

  for (const sensorData of rawSensorData) {
    temporaryDatabase.push({
      sensorId: getSensorName(sensorData.slice(0, 2)),
      value: Number.parseFloat(sensorData.slice(2).trim()),
      date: new Date(),
    });
  }

  if (temporaryDatabase.length > FETCH_LIMIT) {
    await fetch(`${uri}/sensor-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(temporaryDatabase),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error: Error) => console.error(error));

    temporaryDatabase = [];
  }
}

function getSensorName(name: string): number {
  switch (name) {
    case 'TP': {
      // Temperature
      return 1;
    }
    case 'HD': {
      // Humidity
      return 2;
    }
    case 'GH': {
      // Ground Humidity
      return 3;
    }
    case 'AQ': {
      // Air Quality
      return 4;
    }
    case 'GT': {
      // Ground Humidity Threshold
      return 5;
    }
    case 'MT': {
      // Motor On
      return 6;
    }
    default: {
      throw new Error(`Invalid sensor name: ${name}`);
    }
  }
}
