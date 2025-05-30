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

export const patchUserById = async (id, fields) => {
  const allowedFields = ['email', 'role_id'];
  const updates = Object.entries(fields).filter(([key]) =>
    allowedFields.includes(key),
  );

  if (updates.length === 0) return 0;

  const setClause = updates.map(([key]) => `${key} = ?`).join(', ');
  const values = updates.map(([, value]) => value);

  const [result] = await db.query(
    `UPDATE users SET ${setClause} WHERE id = ?`,
    [...values, id],
  );

  return result.affectedRows;
};

export const deleteUserById = async (id) => {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows;
};
