import dotenv from 'dotenv';
import fs from 'fs/promises';
import mysql from 'mysql2/promise';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const initSqlPath = resolve(__dirname, '../../init/init.sql');

let connection;

export async function setupTestDB() {
  const initSql = await fs.readFile(initSqlPath, 'utf8');

  connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT || 3306,
    multipleStatements: true,
  });

  await connection.query(initSql);
}

export async function teardownTestDB() {
  if (connection) {
    await connection.end();
  }
}
