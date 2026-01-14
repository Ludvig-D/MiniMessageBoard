import { Client } from 'pg';
import 'dotenv/config';

const SQL = `
  CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 20 )
  );

  CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL,
  text VARCHAR( 255 ) NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;

async function main() {
  console.log('Seeding...');
  const client = new Client({
    connectionString: process.env.SQLDBCONNECTIONURL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('Done!');
}

main();
