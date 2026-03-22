import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

const dbUrl = process.env.TURSO_DATABASE_URL;

if (!dbUrl && process.env.NODE_ENV === 'production') {
  throw new Error("TURSO_DATABASE_URL is completely missing in Vercel Environment Variables!");
}

const client = createClient({
  url: dbUrl || "file:sqlite.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
