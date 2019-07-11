const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "User",
  password: "",
  multipleStatements: true
});

module.exports = pool.promise();
