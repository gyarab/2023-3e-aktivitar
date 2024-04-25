const db =require("../database")
const loadedUser = require("./userID")

//získá jméno všech aktivit vrátí jje v poli
function getActivName(){
    return new Promise((resolve, reject) => {//pro pockani az bude databaze hotova
      //pole je rozděleno podle typu aktivit
      let data = {
        sport: [],
        cal: [],
        sleep:[]
      }; 
      let userID = loadedUser.getLogUserId()
      var sql='SELECT activ_type, activ_name FROM activity_log   WHERE  user_id = ?;' 
      db.query(sql,[userID], async function (err, result, fields) {
        if (err) {
          console.log(err);
          reject(err);
        }
        //vytvoří set aby tam byli jména aktivit pouze jednou 
        let sportName = new Set();
        for(i = 0; i < result.length; i++){
          if(result[i].activ_type == 'sport'){
            sportName.add(result[i].activ_name)
          }else if(result[i].activ_type == 'call'){
            data.cal = 'call'
          }else if(result[i].activ_type == 'sleep'){
            data.sleep = 'sleep'
          }
        }
        data.sport = sportName;
        resolve(data);
      });
    });
  }

  module.exports = { getActivName:  getActivName}