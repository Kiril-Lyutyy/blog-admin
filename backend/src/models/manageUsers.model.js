import db from '../config/db.js';

export const findAllUsers = async () => {
  const [users] = await db.query(
    'SELECT id, email, role_id, created_at FROM users',
  );
  return users;
};

export const findUserById = async (id) => {
  const [rows] = await db.query(
    'SELECT id, email, role_id, created_at FROM users WHERE id = ?',
    [id],
  );
  return rows[0];
};

export const insertUser = async ({ email, password, role_id }) => {
  const [result] = await db.query(
    'INSERT INTO users (email, password, role_id) VALUES (?, ?, ?)',
    [email, password, role_id],
  );
  return result.insertId;
};

export const updateUserById = async (id, { email, password, role_id }) => {
  const [result] = await db.query(
    'UPDATE users SET email = ?, password = ?, role_id = ? WHERE id = ?',
    [email, password, role_id, id],
  );
  return result.affectedRows;
};

export const deleteUserById = async (id) => {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows;
};
