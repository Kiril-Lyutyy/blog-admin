import dotenv from 'dotenv';
import mySql from 'mysql2/promise';

dotenv.config();

const pool = mySql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT || 3306,
});

export default pool;
