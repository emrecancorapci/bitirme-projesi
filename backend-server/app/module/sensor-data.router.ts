/* eslint-disable @typescript-eslint/no-misused-promises */
import { json, Router } from 'express';

import { get, post } from './sensor-data.controller.ts';

const router = Router();

router.use(json());

router.get('/sensor-data/:minDate/:maxDate', get);
router.post('/sensor-data', post);

export default router;
