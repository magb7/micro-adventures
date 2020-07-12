const mysql = require("mysql2/promise");
const {
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  TOKEN_SECRET,
} = process.env;

const connection = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

const tokenSecret = TOKEN_SECRET;

module.exports = { connection, tokenSecret };
