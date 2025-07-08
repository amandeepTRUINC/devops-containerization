import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('[API] GET /api/users called');
  try {
    const result = await pool.query('SELECT id, first_name, last_name, email FROM users');
    console.log(`[API] Users fetched: count=${result.rows.length}`);
    return NextResponse.json({ users: result.rows });
  } catch (error) {
    console.error('[API] Error fetching users:', error);
    return NextResponse.json({ error: (error as Error).message, details: (error as Error).message, url : process.env.DATABASE_URL }, { status: 500 });
  }
} 