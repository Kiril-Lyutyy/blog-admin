import db from '../config/db.js';

export const findAllPosts = async () => {
  const [rows] = await db.query(`
    SELECT 
      posts.id, 
      posts.title, 
      posts.content, 
      posts.created_at, 
      posts.updated_at, 
      users.email AS author
    FROM posts
    JOIN users ON posts.author_id = users.id
    ORDER BY posts.created_at DESC
  `);
  return rows;
};

export const findPostById = async (id) => {
  const [rows] = await db.query(
    `
    SELECT 
      posts.id, 
      posts.title, 
      posts.content, 
      posts.created_at, 
      posts.updated_at, 
      users.email AS author
    FROM posts
    JOIN users ON posts.author_id = users.id
    WHERE posts.id = ?
  `,
    [id],
  );
  return rows[0];
};

export const createPost = async ({ title, content, author_id }) => {
  const [result] = await db.query(
    'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)',
    [title, content, author_id],
  );
  return result.insertId;
};

export const getPostWithAuthorById = async (id) => {
  const [rows] = await db.query(
    `SELECT posts.id, posts.title, posts.content, posts.created_at, users.email AS author
     FROM posts
     JOIN users ON posts.author_id = users.id
     WHERE posts.id = ?`,
    [id],
  );

  return rows[0];
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
