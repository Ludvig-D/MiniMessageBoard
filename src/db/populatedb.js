import { Pool } from 'pg';
import 'dotenv/config';

const SQL = `
  CREATE TABLE IF NOT EXISTS users(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 20 ) NOT NULL,
  email VARCHAR ( 50 ) NOT NULL,
  age INTEGER,
  bio VARCHAR ( 255 )
  );

  CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL,
  text VARCHAR( 255 ) NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  INSERT INTO users (username, email, age, bio)
  VALUES 
    ('Markus', 'Markus@gmail.com', 24, 'Hej jag heter Marcus');

  INSERT INTO messages (user_id, text)
  VALUES
    ('1', 'This is going to be a big hit');
`;

async function main() {
  console.log('Seeding...');
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('Done!');
}

main();
