import { SensorData, TemporaryDatabase } from './types';

const temporaryDatabase: TemporaryDatabase = {
  data: [],
};

export async function postSensorData(data: string, uri: string): Promise<void> {
  const sensorData = data.toString().split('\r\n');
  if (sensorData.length < 2) return console.error('Invalid data format:', sensorData);

  pushToTemporaryDatabase(sensorData);

  if (temporaryDatabase.data.length > 100) {
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

    cleanTemporaryDatabase();
  }
}

function pushToTemporaryDatabase(sensorData: string[]): void {
  const dataChunk: SensorData[] = [];
  if (temporaryDatabase.dateStart === undefined) {
    temporaryDatabase.dateStart = new Date(Date.now());
  }

  for (let index = 0; index < sensorData.length; index += 2) {
    dataChunk.push({
      sensorName: sensorData[index].trim(),
      value: Number.parseFloat(sensorData[index + 1].trim()),
    });
  }

  temporaryDatabase.data.push({
    date: new Date(),
    sensorData: dataChunk,
  });

  temporaryDatabase.dateEnd = new Date(Date.now());
}

function cleanTemporaryDatabase(): void {
  temporaryDatabase.data = [];
  temporaryDatabase.dateStart = undefined;
  temporaryDatabase.dateEnd = undefined;
}
