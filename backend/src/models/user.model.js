import bcrypt from 'bcrypt';
import pool from '../config/db.js';

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [
    email,
  ]);

  return rows[0];
};

export const findUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

  return rows[0];
};

export async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool.query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, hashedPassword],
  );

  return result.insertId;
}

export async function comparePasswords(inputPassword, storedPassword) {
  return await bcrypt.compare(inputPassword, storedPassword);
}

export async function saveRefreshToken(token, userId) {
  await pool.query(
    'INSERT INTO refresh_tokens (token, user_id) VALUES (?, ?)',
    [token, userId],
  );
}

export async function findUserIdByRefreshToken(token) {
  const [rows] = await pool.query(
    'SELECT user_id FROM refresh_tokens WHERE token = ?',
    [token],
  );

  return rows[0]?.user_id;
}

export async function deleteRefreshToken(token) {
  await pool.query('DELETE FROM refresh_tokens WHERE token = ?', [token]);
}
