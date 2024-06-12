import { Request, Response } from 'express';

import database from '@/database/database.ts';
import { ErrorResponse, SensorData } from '@/types.ts';

interface SensorDataResponse extends SensorData {
  id: number;
}

type Parameters = void;
type ResponseBody = { data: SensorDataResponse[] };
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
    where: ({ time }, { and, gte, lte }) =>
      and(
        gte(time, new Date(min ?? Date.now() - thirtyMin).getTime()),
        lte(time, new Date(max ?? Date.now()).getTime())
      ),
  });

  const formattedData = data.map((data) => ({
    ...data,
    ph: Number(data.ph),
  }));

  return response.status(200).send({ data: formattedData });
}
