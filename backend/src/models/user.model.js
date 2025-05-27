import bcrypt from 'bcrypt';
import pool from '../config/db.js';

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [
    email,
  ]);

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
