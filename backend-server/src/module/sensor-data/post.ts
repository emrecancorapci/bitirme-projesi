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
        typeof data.time === 'number' ||
        (typeof data.time === 'string' &&
          (data.tp === undefined || typeof data.tp === 'number') &&
          (data.hd === undefined || typeof data.hd === 'number') &&
          (data.ph === undefined || typeof data.ph === 'number') &&
          (data.gh === undefined || typeof data.gh === 'number') &&
          (data.aq === undefined || typeof data.aq === 'number') &&
          (data.lt === undefined || typeof data.lt === 'number'))
    )
  ) {
    return response.status(400).send({ message: 'Invalid request body' });
  }

  const secureBody = body.map((data) => {
    const time = new Date(data.time).getTime();

    return {
      time,
      tp: data.tp ?? undefined,
      hd: data.hd ?? undefined,
      ph: String(data.ph) ?? undefined,
      gh: data.gh ?? undefined,
      aq: data.aq ?? undefined,
      lt: data.lt ?? undefined,
    };
  });

  await database
    .insert(sensorData)
    .values(secureBody)
    .then((result) => {
      console.log(result);
      return response.status(201).send({ message: 'Data inserted successfully' });
    })
    .catch((error) => {
      console.error(error);
      return response.status(500).send({ message: 'Internal server error' });
    });
}
