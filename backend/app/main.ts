import { SerialPort } from 'serialport';

interface Entity {
  sensorId: string;
  value: number;
  date: Date;
}

const database: Entity[] = [];

const serialport = new SerialPort({ path: 'COM3', baudRate: 9600 });
serialport.on('data', (data: string) => {
  const sensorData = data.toString().split(':');
  const databaseObject: Entity = {
    sensorId: sensorData[0],
    value: Number.parseFloat(sensorData[1]),
    date: new Date(),
  };

  database.push(databaseObject);

  console.log(database);
});

serialport.on('error', (error) => {
  console.log(error);
});

serialport.on('open', () => {
  console.log('open');
});

serialport.on('close', () => {
  console.log('close');
});
