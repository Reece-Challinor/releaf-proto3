/**
 * Database connection module for RELEAF Demo
 * Connects to PostgreSQL using DATABASE_URL environment variable
 * This is for demo/prototype purposes only
 */
import { Pool } from 'pg';

// Create connection pool using DATABASE_URL from environment
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

/**
 * Test database connectivity
 * Used by health endpoint to verify database is accessible
 * @returns true if database is connected, false otherwise
 */
export async function pingDb(): Promise<boolean> {
  try {
    await pool.query('SELECT 1');
    return true;
  } catch (error) {
    console.error('[DB] Connection failed:', error);
    return false;
  }
}

// Export pool for potential future use
export { pool };