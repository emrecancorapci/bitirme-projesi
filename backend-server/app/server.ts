import http from 'node:http';
import https from 'node:https';

import { config as configEnvironment } from 'dotenv';

import app from './app.ts';
import runDatabase from './config/mongodb.ts';

configEnvironment();

const PORT = Number(process.env.PORT) || 5000;

if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be provided.');

await runDatabase(process.env.MONGO_URI).catch(console.error);

http.createServer(app).listen(PORT);
https.createServer(app).listen(PORT + 1);

console.log(`Server is running on http://localhost:${PORT} and https://localhost:${PORT + 1}`);
