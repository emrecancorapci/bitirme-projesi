import express, { json as expressJson } from 'express';

import sensorDataRouter from './module/sensor-data.router.ts';

const app = express();

app.use(expressJson());

app.use('/api', sensorDataRouter);

export default app;
