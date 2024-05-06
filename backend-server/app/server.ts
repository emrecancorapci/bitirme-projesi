import http from 'node:http';

import * as dotenv from 'dotenv';

import app from './app.ts';
import { connectToDatabase } from './config/mongodb.ts';

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

if (!process.env.MONGO_URI) throw new Error('MONGO_URI must be provided.');

await connectToDatabase().catch((error) => {
  if (error instanceof Error) {
    console.error(error);
    throw new TypeError(error.message);
  }
});

http.createServer(app).listen(PORT);

console.log(`Server is running on http://localhost:${PORT}`);
