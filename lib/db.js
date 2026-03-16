import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ye line environment variable se link legi
  ssl: {
    rejectUnauthorized: false // Online database ke liye zaroori hai
  }
});

export default pool;