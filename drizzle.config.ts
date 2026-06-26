import { defineConfig } from 'drizzle-kit';

const dbName = process.env.POSTGRES_DB || 'local';
const dbUser = process.env.POSTGRES_USER || 'root';
const dbPassword = process.env.POSTGRES_PASSWORD || 'password';

const dbUrl = `postgres://${dbUser}:${dbPassword}@db:5432/${dbName}`;

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: { url: dbUrl },
	verbose: true,
	strict: true
});
