var db = require("../database")
var user_id = require('./userID')

//funkce ktera vrati vsechny zaznamenane aktivity z databaze ke konkretnimu uzivateli a typu aktivity
//vyuzivame ji pri praci s historii
function getActivities(typ_activ){
  var userID = user_id.getLogUserId();

      return new Promise((resolve, reject) => {
        var sql = "SELECT activity_log_id,activ_type, activ_name, activ_date, activ_timeFr, activ_timeTo, activ_distance, activ_cal FROM activity_log WHERE user_id = ? AND activ_type = ? ORDER BY activ_date DESC;";
        db.query(sql, [userID, typ_activ], function (err, result, fields) {
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(result);
          });
        });
         
  }
//tato funkce zobrazi aktivitu podle PK v tabulce activity_log
//vyuzivame ji pri renderovani karticky u zmenaZaznam
function getActivByLogId(log_id){
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM activity_log WHERE activity_log_id = ?;";
    db.query(sql, [log_id], function (err, result, fields) {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(result);
      });
    });
}
  module.exports = {getActivities, getActivByLogId}