var db = require("../config/database");

exports.findUserByUsername = (username) => {
    return new Promise(function(resolve,reject){
    const sql = `SELECT * from users where username="${username}"`;
    db.query(sql,function(err,rows,fields){
      if(err){
        return reject(err);
      }
      resolve(rows[0]);
      });
    });
  }