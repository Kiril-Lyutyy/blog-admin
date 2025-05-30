import db from '../config/db.js';

export const findAllPosts = async () => {
  const [rows] = await db.query('SELECT * FROM posts');
  return rows;
};

export const findPostById = async (id) => {
  const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
  return rows[0];
};

export const createPost = async ({ title, content, author_id }) => {
  const [result] = await db.query(
    'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)',
    [title, content, author_id],
  );
  return result.insertId;
};

export const updatePostById = async (id, { title, content }) => {
  const [result] = await db.query(
    'UPDATE posts SET title = ?, content = ? WHERE id = ?',
    [title, content, id],
  );
  return result.affectedRows;
};

export const deletePostById = async (id) => {
  const [result] = await db.query('DELETE FROM posts WHERE id = ?', [id]);
  return result.affectedRows;
};
