import { Request, Response } from 'express';

import database from '@/database/database.ts';
import { DatabaseSensor, DatabaseSensorData, ErrorResponse } from '@/types.ts';

type Parameters = void;
type ResponseBody = { data: DatabaseSensorData[]; sensors: DatabaseSensor[] };
type RequestBody = void;
type Queries = { min?: string; max?: string };

export async function getSensorData(
  request: Request<Parameters, ResponseBody | ErrorResponse, RequestBody, Queries>,
  response: Response<ResponseBody | ErrorResponse>
) {
  const {
    query: { min, max },
  } = request;

  const thirtyMin = 1_800_000; // 30 * 60 * 1000

  const data = await database.query.sensorData.findMany({
    where: (sensorData, { and, gte, lte }) =>
      and(
        gte(sensorData.time, new Date(min ?? Date.now() - thirtyMin).getTime()),
        lte(sensorData.time, new Date(max ?? Date.now()).getTime())
      ),
  });

  const sensors = await database.query.sensors.findMany();

  return response.status(200).send({ data, sensors });
}
