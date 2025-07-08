import { Pool } from 'pg';
console.log("**********. DATABASE URL ************", process.env.DATABASE_URL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('[DB] PostgreSQL pool connected');
});

pool.on('error', (err) => {
  console.error('[DB] PostgreSQL pool error:', err);
});

export default pool; 