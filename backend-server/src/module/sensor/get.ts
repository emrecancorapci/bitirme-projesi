import { Request, Response } from 'express';

import database from '@/database/database.ts';
import { DatabaseSensor, ErrorResponse } from '@/types.ts';

type ResponseBody = { sensors: DatabaseSensor[] };

export async function getAllSensors(_: Request, response: Response<ResponseBody | ErrorResponse>) {
  const sensors = await database.query.sensors.findMany();

  return response.status(200).send({ sensors });
}
