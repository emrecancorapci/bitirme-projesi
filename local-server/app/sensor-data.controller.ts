/* eslint-disable security/detect-object-injection */
import { SensorData } from './types';

const sensorController = () => {
  let temporaryDatabase: SensorData[] = [];

  const FETCH_SIZE = 100;
  const TIME_OFFSET_THRESHOLD_MS = 1000;

  async function postSensorData(rawSensorData: string, uri: string): Promise<void> {
    if (rawSensorData.length > 9) {
      console.error('Invalid sensor data:', rawSensorData);
      return;
    }

    const [sensorName, sensorValue] = parseRawData(rawSensorData);

    if (temporaryDatabase.length > 1) {
      const index = temporaryDatabase.findIndex((data) => {
        const timeDifference = data.date - Date.now();
        return timeDifference < TIME_OFFSET_THRESHOLD_MS;
      });

      if (index === -1) {
        pushNew(sensorName, sensorValue);
      } else {
        pushExisting(index, sensorName, sensorValue);
      }
    } else {
      pushNew(sensorName, sensorValue);
    }

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

  function pushNew(sensorName: string, sensorValue: number) {
    temporaryDatabase.push({
      [sensorName.toLowerCase()]: sensorValue,
      date: Date.now(),
    });
  }

  function pushExisting(index: number, sensorName: string, sensorValue: number) {
    temporaryDatabase[index] = {
      ...temporaryDatabase[index],
      [sensorName.toLowerCase()]: sensorValue,
    };
  }

  return { postSensorData };
};

function parseRawData(data: string): [string, number] {
  return [data.slice(0, 2), Number.parseFloat(data.slice(2).trim())];
}

export { sensorController };

// function getSensorName(name: string): number {
//   switch (name) {
//     case 'TP': {
//       // Temperature
//       return 1;
//     }
//     case 'HD': {
//       // Humidity
//       return 2;
//     }
//     case 'PH': {
//       // pH
//       return 3;
//     }
//     case 'GH': {
//       // Ground Humidity
//       return 4;
//     }
//     case 'AQ': {
//       // Air Quality
//       return 5;
//     }
//     case 'LT': {
//       // Light
//       return 6;
//     }
//     default: {
//       throw new Error(`Invalid sensor name: ${name}`);
//     }
//   }
// }
