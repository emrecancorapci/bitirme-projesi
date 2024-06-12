/* eslint-disable @typescript-eslint/no-misused-promises */
import { json, Router } from 'express';

import { getAllSensors } from './get.ts';

const sensorRouter = Router();

sensorRouter.use(json());

sensorRouter.get('/sensor', getAllSensors);

export { sensorRouter };
