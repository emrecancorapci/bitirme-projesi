import { Request, Response } from 'express';

import database from '@/database/database.ts';
import { sensorData } from '@/database/schema.ts';
import { ErrorResponse, SensorData } from '@/types.ts';

type Parameters = void;
type RequestBody = SensorData[];
type ResponseBody = { message: string };
type Queries = void;

export async function postSensorData(
  request: Request<Parameters, ResponseBody | ErrorResponse, RequestBody, Queries>,
  response: Response<ResponseBody | ErrorResponse>
) {
  const { body } = request;

  if (!Array.isArray(body)) {
    return response.status(400).send({ message: 'Invalid request body' });
  }

  if (body.length === 0) {
    return response.status(400).send({ message: 'Empty request body' });
  }

  if (
    !body.every(
      (data) =>
        typeof data.sensorId === 'number' &&
        typeof data.value === 'number' &&
        typeof data.time === 'number'
    )
  ) {
    return response.status(400).send({ message: 'Invalid request body' });
  }

  const databseAnswer = await database.insert(sensorData).values(body);
  console.log(databseAnswer);

  return response.status(201).send({ message: 'Data inserted' });
}
