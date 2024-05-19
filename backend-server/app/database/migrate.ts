import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

dotenv.config();

const { PG_CONNECT } = process.env;

if (!PG_CONNECT) throw new Error('Missing environment variables');

const migrationClient = postgres(PG_CONNECT, { max: 1 });

const database = drizzle(migrationClient);

await migrate(database, { migrationsFolder: 'drizzle' });

await migrationClient.end();
