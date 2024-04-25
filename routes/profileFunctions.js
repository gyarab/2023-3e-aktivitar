const db = require('../database');
const user_id = require('./userID')

//funkce  ktera nacte bio uzivatele z databaze 
function getUserBio(){
    var userID = user_id.getLogUserId();

    return new Promise((resolve, reject) => {
        var sql = "SELECT bio FROM user_profile WHERE user_id = ?";
        //console.log(value) 
        db.query(sql, [userID], function (err, result) {
            if (err) {
              console.log(err);
              reject(err);
            }else if(result<1){
                resolve(null)
            }else{
            resolve(result);
            }
        
          });
        });
}

//vezme bio frienda pomoci username, pouzivame pri zobrazeni friendProfile
function getFriendBio(frienduserName){

    return new Promise((resolve, reject) => {
        var sql = "SELECT bio FROM user_profile up JOIN users u ON (up.user_id = u.user_id) WHERE user_username = ?";
        //console.log(value) 
        db.query(sql,[frienduserName], function (err, result) {
            if (err) {
              console.log(err);
              reject(err);
            }else if(result<1){
                resolve(null)
            }else{
            resolve(result);
            }
        
          });
        });
}

module.exports = {getUserBio, getFriendBio}