/* eslint-disable @typescript-eslint/no-misused-promises */
import { json, Router } from 'express';

import { getSensorData } from './get.ts';
import { postSensorData } from './post.ts';

const sensorDataRouter = Router();

sensorDataRouter.use(json());

sensorDataRouter.get('/sensor-data', getSensorData);
sensorDataRouter.post('/sensor-data', postSensorData);

export { sensorDataRouter };
