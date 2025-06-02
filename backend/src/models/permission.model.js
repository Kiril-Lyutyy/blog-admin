import pool from '../config/db.js';

export async function getPermissionsByRoleId(roleId) {
  const [rows] = await pool.query(
    `SELECT p.name FROM permissions p
     INNER JOIN role_permissions rp ON rp.permission_id = p.id
     WHERE rp.role_id = ?`,
    [roleId],
  );

  return rows.map((row) => row.name);
}
