import pool from '../pool.js';

async function getAllMessages() {
  const { rows } = await pool.query(
    `
    SELECT messages.*, users.username 
    FROM messages 
    JOIN users 
    ON messages.user_id = users.id;
    `
  );
  return rows;
}

async function insertMessage(text, user_id) {
  await pool.query(
    `
    INSERT INTO messages (user_id, text)
    VALUES ($1, $2)
    `,
    [user_id, text]
  );
}

export { getAllMessages, insertMessage };
