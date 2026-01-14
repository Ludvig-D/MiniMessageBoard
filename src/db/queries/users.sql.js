import pool from '../pool.js';

async function getAllUsers() {
  const { rows } = await pool.query(
    `
      SELECT * FROM users
    `
  );
  return rows;
}

async function getUser(id) {
  const { rows } = await pool.query(
    `
      SELECT * FROM users WHERE users.id = ($1)
    `,
    id
  );
  return rows[0];
}

async function insertUser({ username, email, age, bio }) {
  await pool.query(
    `
    INSERT INTO users (username, email, age, bio)
    VALUES ($1, $2, $3, $4);
    `,
    [username, email, age, bio]
  );
}

async function updateUser(id, { username, email, age, bio }) {
  await pool.query(
    `
    UPDATE users
      SET username = ($2),
          email = ($3),
          age = ($4),
          bio = ($5)
    WHERE users.id = ($1);
    `,
    [id, username, email, age, bio]
  );
}

async function deleteUser(id) {
  await pool.query(
    `
    DELETE FROM users
    WHERE users.id = ($1)
    `,
    [id]
  );
}

async function searchUsers(name_query) {
  const { rows } = await pool.query(
    `
    SELECT * FROM users 
    WHERE username ILIKE ($1);
    `,
    [`${name_query}%`]
  );
  return rows;
}

export {
  getAllUsers,
  getUser,
  insertUser,
  updateUser,
  deleteUser,
  searchUsers,
};
