import pool from '../pool';

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
  return rows;
}

async function insertUser({ firstName, lastName, email, age, bio }) {
  await pool.query(
    `
    INSERT INTO users (firstName, lastName, email, age, bio)
    VALUES ($1, $2, $3, $4, $5,)
    `,
    [firstName, lastName, email, age, bio]
  );
}

async function updateUser(id, { firstName, lastName, email, age, bio }) {
  await pool.query(
    `
    UPDATE users
    WHERE users.id = ($1)
    `,
    [id]
  );
}

export { getAllUsers, getUser, insertUser };
