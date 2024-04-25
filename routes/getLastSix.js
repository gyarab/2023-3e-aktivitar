var db = require("../database")
const user_id = require('./userID')


//nacte poslednich sest aktivit konkretniho uzivatele, pouzivame v sekcich last Six
function getLastSix(){
  var userID = user_id.getLogUserId();
  
    return new Promise((resolve, reject) => {
       var sql = "SELECT activ_type, activ_name, activ_date, activ_timeFr, activ_timeTo, activ_distance, activ_cal from activity_log WHERE user_id = ? ORDER BY activ_date DESC LIMIT 6;";
       db.query(sql, [userID], function (err, result, fields) {
           if (err) {
             console.log(err);
             reject(err);
           }
           resolve(result);
         });
       });
}

//nacte poslednich sest aktivit frienda, pouzivame v sekcich last Six
function getFriendsLastSix(friendUserName){
   
   console.log(friendUserName);
    return new Promise((resolve, reject) => {
       var sql = "SELECT user_username,activ_type, activ_name, activ_date, activ_timeFr, activ_timeTo, activ_distance, activ_cal from activity_log al JOIN users u ON(u.user_id = al.user_id) WHERE  user_username = ? ORDER BY activ_date DESC LIMIT 6;";
       db.query(sql, [friendUserName], function (err, result, fields) {
           if (err) {
             console.log(err);
             reject(err);
           }
           resolve(result);
         });
       });
}


module.exports = {getLastSix,getFriendsLastSix}