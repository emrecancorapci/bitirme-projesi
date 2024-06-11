import http from 'node:http';

import * as dotenv from 'dotenv';

import app from './app.ts';
import { getPgVersion } from './database/database.ts';

dotenv.config();

await getPgVersion();

const PORT = Number(process.env.PORT) || 5000;

http.createServer(app).listen(PORT);

console.log(`Server is running on http://localhost:${PORT}`);
