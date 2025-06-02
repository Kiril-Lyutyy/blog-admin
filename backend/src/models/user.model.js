import bcrypt from 'bcrypt';

import pool from '../config/db.js';
import { userRoles } from '../constants/roles.js';

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query(
    `
    SELECT users.*, roles.name AS role
    FROM users
    JOIN roles ON users.role_id = roles.id
    WHERE users.email = ?
  `,
    [email],
  );

  return rows[0];
};

export const findUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

  return rows[0];
};

export async function createUser(email, password, roleName = userRoles.viewer) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [role] = await pool.query('SELECT id FROM roles WHERE name = ?', [
    roleName,
  ]);

  if (!role.length) {
    throw new Error('Role not found');
  }

  const roleId = role[0].id;
  const [result] = await pool.query(
    'INSERT INTO users (email, password, role_id) VALUES (?, ?, ?)',
    [email, hashedPassword, roleId],
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

export async function findUserByIdWithRole(userId) {
  const [rows] = await pool.query(
    `SELECT u.id, u.email, u.role_id, r.name AS role_name
     FROM users u
     JOIN roles r ON u.role_id = r.id
     WHERE u.id = ?`,
    [userId],
  );

  return rows[0];
}
