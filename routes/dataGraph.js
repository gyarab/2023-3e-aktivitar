const db =require("../database")
const loadedUser = require("./userID")
const friends = require("./showMyFriends");
const {calculateTime} = require("./calculationOfDuration");

//ziskani info z db
function getDBInfo(nameActivity){
  return new Promise((resolve, reject) => {//pro pockani az bude databaze hotova
    let info = {
      labels: [],
      valuesBurnCal: [],
      valuesDis:[],
      time:[],
      friendsData:[]
    }; 
    let user = loadedUser.getLogUserId()
    
    //podle typu activity nastav sql příkaz
    if(nameActivity != 'call' && nameActivity != 'sleep' ){
      var sql='SELECT * FROM activity_log  WHERE  user_id = '+ [user] +' AND activ_name = ?'; 
    }else {
      var sql='SELECT * FROM activity_log  WHERE  user_id = '+ [user] +' AND activ_type = ?';
    }
    var  value = [nameActivity];
    db.query(sql, value, async function (err, result, fields) {
      arrFriend_username = await friends.showMyFriends()
      if (err) {
        console.log(err);
        reject(err);
      }
      
      //cyklus kde se zavola funkce na data pro graf kamose(přidá všechny kámoše)
      for(i = 0; i < result.length; i++){
        activTime = calculateTime(result[i].activ_timeFr, result[i].activ_timeTo)
        info.labels.push(result[i].activ_date)
        info.valuesBurnCal.push(result[i].activ_cal)
        info.valuesDis.push(result[i].activ_distance)
        info.time.push(activTime)
      }
      //data pro graf typu aktiviti jídlo a spánek pro tohle nechceme data kamarada
      if(nameActivity != 'sleep' && nameActivity != 'call'){
        for(i = 0; i < arrFriend_username.length; i++){
          info.friendsData.push(await friendsData(nameActivity, arrFriend_username[i]))
          if(info.friendsData[info.friendsData.length - 1] == 0){
            info.friendsData.pop(info.friendsData.length-1)
          }
        }
      }
      resolve(info);
    });
  });
}

//data kamarada
function friendsData(nameActivity, friend_username){
  return new Promise((resolve, reject) => {
      let friendInfo = {
        friendsName:[],
        labels: [],
        valuesBurnCal: [],
        valuesDis:[],
        time:[]
      }
      var sql = 'SELECT * FROM activity_log al JOIN users u ON(al.user_id = u.user_id) WHERE user_username = ? AND activ_name = ? ;';
      db.query(sql, [friend_username,nameActivity], function (err, result, fields) {
        if (err) {
          console.log(err);
          reject(err);
        }
        //console.log(result);
        if(result[0] != undefined){
          friendInfo.friendsName.push(result[0].user_username)//vime ze tam ten user je achceme ho pouze jednou
          for(j = 0; j < result.length; j++){
            activTime = calculateTime(result[j].activ_timeFr, result[j].activ_timeTo)
            friendInfo.labels.push(result[j].activ_date)
            friendInfo.valuesBurnCal.push(result[j].activ_cal)
            friendInfo.valuesDis.push(result[j].activ_distance)
            friendInfo.time.push(activTime)
         }
         resolve(friendInfo)
        }else{
          resolve(friendInfo = 0)
        }
      })
  });
}

module.exports = {getDBInfo: getDBInfo}

