import { DataChunk, SensorData } from './types';

const temporaryDatabase: DataChunk[] = [];

export async function postSensorData(data: string, uri: string): Promise<void> {
  const sensorData = data.toString().split('\r\n');
  if (sensorData.length < 2) return console.error('Invalid data format:', sensorData);

  pushToTemporaryDatabase(sensorData);

  if (temporaryDatabase.length > 100) {
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
  }
}

function pushToTemporaryDatabase(sensorData: string[]): void {
  const dataChunk: SensorData[] = [];

  for (const sensorDatum of sensorData) {
    dataChunk.push({
      id: getSensorName(sensorDatum.slice(0, 2)),
      value: Number.parseFloat(sensorDatum.slice(2).trim()),
    });
  }

  temporaryDatabase.push({
    date: new Date(),
    sensorData: dataChunk,
  });
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
