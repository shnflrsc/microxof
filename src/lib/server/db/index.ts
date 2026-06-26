import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

const dbName = env.POSTGRES_DB || 'local';
const dbUser = env.POSTGRES_USER || 'root';
const dbPassword = env.POSTGRES_PASSWORD || 'password';

const dbUrl = `postgres://${dbUser}:${dbPassword}@db:5432/${dbName}`;

const client = postgres(dbUrl);

export const db = drizzle(client, { schema });
