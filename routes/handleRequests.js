const express = require('express');
const router = express();
const db = require('../database');
const loadedUser= require("./userID");

//načte a vratí seznam žádostí z databáze
function loadRequest(){
    return new Promise((resolve, reject) => {
        let arrReq = []; 
        let userID = loadedUser.getLogUserId()
        var sql='SELECT * FROM users, friendrequest f' 
        +' WHERE f.requesting_user_id = '+ userID 
        +' AND f.user_id = users.user_id ;'

        db.query(sql, function (err, result, fields) {
            if (err) {
                console.log(err);
                reject(err);
            }
            //dá jména uživatelů, kteří poslali žádost do pole
            for(i = 0; i < result.length; i++){
                arrReq.push(result[i].user_username)
            }
            resolve(arrReq)
        })
    })
}

module.exports = {loadRequest:loadRequest};