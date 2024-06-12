import express, { json as expressJson } from 'express';

import { sensorRouter } from './module/sensor/router.ts';
import { sensorDataRouter } from './module/sensor-data/router.ts';

const app = express();

app.use(expressJson());

app.use('/api', sensorDataRouter);
app.use('/api', sensorRouter);

export default app;
