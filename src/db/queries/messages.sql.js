import pool from '../pool.js';

async function getAllMessages() {
  const { rows } = await pool.query(
    `
    SELECT messages.id, messages.text, users.username 
    FROM messages 
    JOIN users 
    ON messages.user_id = users.id;
    `
  );
  return rows;
}

async function insertMessage({ text, user_id }) {
  await pool.query(
    `
    INSERT INTO messages (text, user_id)
    VALUES ($1, $2) RETURNING
    `,
    [text, user_id]
  );
}

export { getAllMessages, insertMessage };
