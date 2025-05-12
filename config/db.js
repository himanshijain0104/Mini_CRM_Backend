const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Host of the MySQL server
  user: process.env.DB_USER,            // Username of the MySQL server
  password: process.env.DB_PASSWORD , // Password of the MySQL server
  database: process.env.DB_NAME,    // Name of the database
  port: 330               // Port for MySQL
});

const promisePool = pool.promise();

module.exports = promisePool;

