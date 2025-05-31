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

export const findUsersWithFilters = async ({
  page = 1,
  limit = 10,
  search = '',
  role_id = null,
}) => {
  const offset = (page - 1) * limit;

  const conditions = [];
  const params = [];

  if (search) {
    conditions.push('users.email LIKE ?');
    params.push(`%${search}%`);
  }

  if (role_id !== null) {
    conditions.push('users.role_id = ?');
    params.push(role_id);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const query = `
    SELECT users.id, users.email, users.role_id, roles.name AS role_name
    FROM users
    JOIN roles ON users.role_id = roles.id
    ${whereClause}
    ORDER BY users.id DESC
    LIMIT ?
    OFFSET ?
  `;

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM users
    ${whereClause}
  `;

  const [userRows] = await db.query(query, [...params, limit, offset]);
  const [countRows] = await db.query(countQuery, params);

  return {
    users: userRows,
    total: countRows[0].total,
  };
};
