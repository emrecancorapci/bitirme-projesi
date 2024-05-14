import { Request, Response } from 'express';
import * as mongoDb from 'mongodb';

import { collections } from './config/mongodb.ts';
import errorHandler from './error-handler.ts';

class SensorData {
  constructor(
    public sensorId: string,
    public value: number,
    public date: Date,
    public id?: mongoDb.ObjectId
  ) {}
}

type ErrorResponse = { message: string };

type GetParameters = { minDate: string; maxDate: string };
type GetResponseBody = { data: SensorData[] };

export async function get(
  request: Request<GetParameters, GetResponseBody | ErrorResponse>,
  response: Response<GetResponseBody | ErrorResponse>
) {
  try {
    const data = (await collections.data
      ?.find({
        date: {
          $gte: new Date(request.params.minDate),
          $lt: new Date(request.params.maxDate),
        },
      })
      .toArray()) as unknown as SensorData[];

    return response.status(200).send({ data });
  } catch (error: unknown) {
    const { code, message } = errorHandler(error);
    return response.status(code).send({ message });
  }
}

type PostParameters = void;
type PostRequestBody = SensorData;

interface PostResponseBody {
  id: mongoDb.ObjectId;
  message: string;
}

export async function post(
  request: Request<PostParameters, PostResponseBody | ErrorResponse, PostRequestBody>,
  response: Response<PostResponseBody | ErrorResponse>
) {
  try {
    const result = await collections.data?.insertOne(request.body);
    if (!result) return response.status(500).send({ message: 'Error saving sensor data' });

    return response.status(201).send({ message: 'Sensor data saved', id: result.insertedId });
  } catch (error: unknown) {
    const { code, message } = errorHandler(error);
    return response.status(code).send({ message });
  }
}
