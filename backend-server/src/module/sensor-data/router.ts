/* eslint-disable @typescript-eslint/no-misused-promises */
import { json, Router } from 'express';

import { getSensorData } from './get.ts';
import { postSensorData } from './post.ts';

const router = Router();

router.use(json());

router.get('/sensor-data', getSensorData);
router.post('/sensor-data', postSensorData);

export default router;
