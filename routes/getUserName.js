var db = require("../database")
var userLog = require("./passport-config")
var user_id = require("./userID")

//vrátí získané jméno usera a jeho username
function getUser(){
    return new Promise((resolve, reject) => {

    let nickname = null
    var sql = "SELECT * FROM aktivitar.users WHERE user_id =?;"
    var value = user_id.getLogUserId() 
    db.query(sql, value, function (err, result, fields) {
        if (err) {
          console.log(err);
          reject(err);
        }
        nickname = [result[0].user_nickname, result[0].user_username]
        resolve(nickname);
      });
    });
}


module.exports = {getUser: getUser}