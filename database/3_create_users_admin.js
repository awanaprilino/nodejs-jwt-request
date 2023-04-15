const db = require("../config/database");
const bcrypt = require('bcryptjs');

const username = "admin";
const password = bcrypt.hashSync("123456", 10);
const sql = `INSERT INTO users (username, password) 
            VALUES ("${username}", "${password}")`;

db.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Create user admin");
});