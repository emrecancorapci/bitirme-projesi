import database from '@/database/database.ts';
import { sensors } from '@/database/schema.ts';

async function populate() {
  const sensorsData = [
    { name: 'Temperature', short: 'TP', unit: '°C' },
    { name: 'Humidity', short: 'HD', unit: '%' },
    { name: 'pH', short: 'PH', unit: 'pH' },
    { name: 'Ground Humidity', short: 'GH', unit: '%' },
    { name: 'Air Quality', short: 'AQ', unit: 'ppm' },
    { name: 'Light', short: 'LT', unit: 'lux' },
  ];

  const response = await database
    .insert(sensors)
    .values(sensorsData)
    .catch(function catchPopulateDatabaseError(error) {
      throw error instanceof Error
        ? new TypeError(error.message)
        : new Error('An error occurred while populating the database');
    });

  return response;
}

await populate()
  .then((response) => {
    console.log(response);
    return;
  })
  .catch((error) => {
    console.error(error);
    return;
  });
