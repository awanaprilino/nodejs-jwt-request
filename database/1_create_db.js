var db = require("../config/database");

const sql = "CREATE DATABASE nodejs_test_awan";
db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Database created");
});