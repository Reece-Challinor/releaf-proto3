/**
 * Database connection module for RELEAF Demo
 * Connects to PostgreSQL using DATABASE_URL environment variable
 * This is for demo/prototype purposes only
 */
import { Pool } from 'pg';

// Create connection pool using DATABASE_URL from environment
const pool = process.env.DATABASE_URL ? new Pool({
  connectionString: process.env.DATABASE_URL
}) : undefined;

/**
 * Test database connectivity
 * Used by health endpoint to verify database is accessible
 * @returns true if database is connected, false otherwise
 */
export async function pingDb(): Promise<boolean> {
  if (!pool) return false;
  try {
    await pool.query('SELECT 1');
    return true;
  } catch (error) {
    console.error('[DB] Connection failed:', error);
    return false;
  }
}

export async function initDb() {
  if (!pool) {
    console.error('[DB] No pool available for initDb');
    return;
  }
  await pool.query(`create table if not exists license_attempts(
    id serial primary key,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    state_code text not null,
    license_id text not null,
    status text not null default 'started'
  );`);
}

export async function insertAttempt(state_code: string, license_id: string): Promise<number> {
  if (!pool) throw new Error('Database not available');
  const r = await pool.query(`insert into license_attempts(state_code,license_id) values($1,$2) returning id`, [state_code, license_id]);
  return r.rows[0].id as number;
}

export async function updateAttempt(id: number, status: string) {
  if (!pool) throw new Error('Database not available');
  await pool.query(`update license_attempts set status=$1, updated_at=now() where id=$2`, [status, id]);
}

// Export pool for potential future use
export { pool };