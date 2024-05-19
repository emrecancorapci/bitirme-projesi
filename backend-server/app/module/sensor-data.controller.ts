import { Request, Response } from 'express';

import database from '../database/database.ts';
import { sensorData } from '../database/schema.ts';
import { DatabaseSensor, DatabaseSensorData, SensorData } from '../types.ts';

type ErrorResponse = { message: string };

type GetParameters = { minDate: string; maxDate: string };
type GetResponseBody = { data: DatabaseSensorData[]; sensors: DatabaseSensor[] };

export async function get(
  request: Request<GetParameters, GetResponseBody | ErrorResponse>,
  response: Response<GetResponseBody | ErrorResponse>
) {
  const data = await database.query.sensorData.findMany({
    where: (sensorData, { and, gte, lte }) =>
      and(
        gte(sensorData.time, new Date(request.params.minDate).getTime()),
        lte(sensorData.time, new Date(request.params.maxDate).getTime())
      ),
  });

  const sensors = await database.query.sensors.findMany();

  return response.status(200).send({ data, sensors });
}

type PostParameters = void;
type PostRequestBody = SensorData[];

interface PostResponseBody {
  message: string;
}

export async function post(
  request: Request<PostParameters, PostResponseBody | ErrorResponse, PostRequestBody>,
  response: Response<PostResponseBody | ErrorResponse>
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

  await database.insert(sensorData).values(body);

  return response.status(201).send({ message: 'Data inserted' });
}
