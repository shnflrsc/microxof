import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

const client = postgres("postgres://root:mysecretpassword@db:5432/local");

export const db = drizzle(client, { schema });