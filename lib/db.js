import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',           // Default user
  host: 'localhost',          // Aapka computer
  database: 'my_project',     // Jo naam pgAdmin mein rakha
  password: '1234',  // Aapka pgAdmin password
  port: 5432,                 // Standard port
});

export default pool;




