var db = require("../database")
var user_id = require('./userID')


//secte kalorie
function callCount(activ_type, date){
     var userID = user_id.getLogUserId();

     return new Promise((resolve, reject)=>{
        var sql = "SELECT SUM(activ_cal) AS sum_call, activ_date FROM activitiy_log WHERE user_id = ? AND activ_type = ?  GROUP BY activ_date;";
        db.query(sql, [userID, activ_type, date ], function(err,result,fields){
            if (err){
                console.log(err);
                reject(err);
            }
            resolve(result);
        });
     });
}

module.exports = {callCount}
