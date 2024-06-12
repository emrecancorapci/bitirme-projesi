import { bigint, numeric, pgTable, serial, smallint, varchar } from 'drizzle-orm/pg-core';

export const sensors = pgTable('sensors', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 64 }).notNull(),
  short: varchar('short', { length: 2 }),
  unit: varchar('unit', { length: 16 }),
});

export const sensorData = pgTable('sensor_data', {
  id: serial('id').primaryKey(),
  time: bigint('time', { mode: 'number' }).notNull(),
  tp: smallint('tp'),
  hd: smallint('hd'),
  ph: numeric('ph', { precision: 4, scale: 2 }),
  gh: smallint('gh'),
  aq: smallint('aq'),
  lt: smallint('lt'),
});
