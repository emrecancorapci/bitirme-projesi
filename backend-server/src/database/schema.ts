import { relations } from 'drizzle-orm';
import { bigint, integer, pgTable, serial, smallint, varchar } from 'drizzle-orm/pg-core';

export const sensors = pgTable('sensors', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 64 }).notNull(),
  short: varchar('short', { length: 2 }),
  unit: varchar('unit', { length: 16 }),
});

export const sensorsRelations = relations(sensors, ({ many }) => ({
  data: many(sensorData),
}));

export const sensorData = pgTable('sensor_data', {
  id: serial('id').primaryKey(),
  sensorId: integer('sensor_id')
    .references(() => sensors.id)
    .notNull(),
  value: smallint('value').notNull(),
  time: bigint('time', { mode: 'number' }).notNull(),
});

export const sensorDataRelations = relations(sensorData, ({ one }) => ({
  sensor: one(sensors, { fields: [sensorData.sensorId], references: [sensors.id] }),
}));