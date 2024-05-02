import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import { crud } from './config/mongodb';
import { SensorData } from './types';

export async function get(request: Request, response: Response) {
  const collection = await crud('sensors', 'data');
  collection().find();
}

type PostParameters = void;
type PostRequestBody = SensorData;

interface PostResponseBody {
  message: string;
  id: ObjectId;
}

export async function post(
  request: Request<PostParameters, PostResponseBody, PostRequestBody>,
  response: Response<PostResponseBody>
) {
  const { sensorId, value, date }: SensorData = request.body;

  const collection = await crud('sensors', 'data');
  await collection()
    .insertOne({ sensorId, value, date })
    .then((databaseResponse) => {
      if (databaseResponse.acknowledged) {
        return response
          .status(201)
          .send({ message: 'Sensor data saved successfully', id: databaseResponse.insertedId });
      }
    });
}
