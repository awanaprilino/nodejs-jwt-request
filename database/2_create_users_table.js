const db = require("../config/database");

const sql = `CREATE TABLE users 
    (
        id int NOT NULL AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL, 
        password VARCHAR(255),
        PRIMARY KEY (id),
        UNIQUE (username)
    )`;

db.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table created");
});