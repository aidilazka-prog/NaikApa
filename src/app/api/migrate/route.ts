import { NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { migrate } from 'drizzle-orm/libsql/migrator';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url || !authToken) {
      return NextResponse.json({ error: "Missing Turso credentials in environment" }, { status: 500 });
    }

    const client = createClient({ url, authToken });
    const db = drizzle(client);

    await migrate(db, { migrationsFolder: './drizzle' });

    return NextResponse.json({ message: "Migration successfully pushed to Turso!" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}
