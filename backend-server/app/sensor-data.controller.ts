import { Request, Response } from 'express';
import * as mongoDb from 'mongodb';

import { collections } from './config/mongodb.ts';
import errorHandler from './error-handler.ts';
import { DataObject, SensorData } from './types.ts';

type ErrorResponse = { message: string };

type GetParameters = { minDate: string; maxDate: string };
type GetResponseBody = DataObject;

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
      .toArray()) as unknown as DataObject[];

    const formattedData = {
      // eslint-disable-next-line unicorn/no-array-reduce
      sensorData: data.reduce((accumulator, current) => {
        accumulator = [...accumulator, ...current.sensorData];
        return accumulator;
      }, [] as SensorData[]),
      dateStart: data[0].dateStart,
      dateEnd: data.at(-1)?.dateEnd || new Date(Date.now()),
    };

    return response.status(200).send(formattedData);
  } catch (error: unknown) {
    const { code, message } = errorHandler(error);
    return response.status(code).send({ message });
  }
}

type PostParameters = void;
type PostRequestBody = DataObject;

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
