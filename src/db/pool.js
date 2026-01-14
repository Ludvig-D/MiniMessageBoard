import { Pool } from 'pg';

export default new Pool({
  host: process.env.SQLHOST,
  user: process.env.SQLUSER,
  database: process.env.SQLDATABASE,
  password: process.env.SQLPASSWORD,
  port: process.env.SQLPORT,
  // connectionString: process.env.SQLDBCONNECTIONURL,
});
