const express = require('express');
const router = express();
const db = require('../database');
const loadedUser= require("./userID");

//získá jména všech kamarádů vratí jako pole
function showMyFriends(){
    return new Promise((resolve, reject) => {
        let arrFriends = []; 
        //získá userID
        let userID = loadedUser.getLogUserId()
        var sql='SELECT * FROM users, friendpair f' 
        +' WHERE f.user_id = '+ userID 
        +' AND f.friend_user_id = users.user_id ;'

        db.query(sql, function (err, result, fields) {
            if (err) {
                console.log(err);
                reject(err);
            }
            //přídá výsledky do pole, které se následně vrací
            for(i = 0; i < result.length; i++){
                arrFriends.push(result[i].user_username)
            }
            resolve(arrFriends)
        })
    })
}

module.exports = {showMyFriends:showMyFriends};