import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/lib/server/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: { url: "postgres://root:mysecretpassword@db:5432/local" },
    verbose: true,
    strict: true
});