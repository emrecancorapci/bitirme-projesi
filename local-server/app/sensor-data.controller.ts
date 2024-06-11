import { SensorData } from './types';

let temporaryDatabase: SensorData[] = [];

const FETCH_SIZE = 100;

export async function postSensorData(data: string, uri: string): Promise<void> {
  const rawSensorData = data.toString();

  if (rawSensorData.length > 9) {
    console.error('Invalid sensor data:', rawSensorData);
  }

  temporaryDatabase.push({
    sensorId: getSensorName(rawSensorData.slice(0, 2)),
    value: Number.parseFloat(rawSensorData.slice(2).trim()),
    date: new Date(Date.now()),
  });

  if (temporaryDatabase.length > FETCH_SIZE) {
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
    case 'PH': {
      // pH
      return 3;
    }
    case 'GH': {
      // Ground Humidity
      return 4;
    }
    case 'AQ': {
      // Air Quality
      return 5;
    }
    case 'LT': {
      // Light
      return 6;
    }
    default: {
      throw new Error(`Invalid sensor name: ${name}`);
    }
  }
}
