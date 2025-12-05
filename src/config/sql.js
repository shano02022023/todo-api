import "dotenv/config";
import mysql from "mysql2";

export const db = mysql
  .createConnection({
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
  })
  .promise();
