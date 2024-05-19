import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

// declaring enum in database
export const sensors = pgTable('sensors', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 64 }),
  short: varchar('short', { length: 2 }),
  unit: varchar('unit', { length: 16 }),
});

export const sensorData = pgTable('sensor_data', {
  id: serial('id').primaryKey(),
  sensorId: integer('sensor_id').references(() => sensors.id),
  value: integer('value'),
  time: integer('time'),
});
