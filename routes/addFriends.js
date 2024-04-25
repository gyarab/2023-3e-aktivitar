const express = require('express');
const router = express();
const db = require('../database');
const loadedUser= require("./userID");


//user nickname v levem hornim rohu
async function nameOfLoadedUser(){
    const loadName = require("./getUserName");
    var user_username = await loadName.getUser()
    //console.log(user_username)
    return user_username
 }
 async function lengthNoti(){
    let loadReq = require("./handleRequests")
    let arrReq = await loadReq.loadRequest();
    return arrReq.length 
 }

//tahle metoda napovida pri vyhledavani kamose
function search(searchTerm) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM users WHERE user_username LIKE ?"; //nevim jak osetrit sql injection
        db.query(sql, ['%' + searchTerm + '%'], (err, results) => {
            if (err) {
                reject(err);
            } else {
                const suggestions = results.map(item => item.user_username);
                resolve(suggestions);
            }
        });
    });
}

//nacte id frienda podle jmena
function loadFriendID(addFriend){
    return new Promise((resolve, reject) => {
        let sqlFindUserFriendId = "SELECT user_id FROM users WHERE user_username= ?;"
        db.query(sqlFindUserFriendId,[addFriend], function (err, result, fields) {
            if (err) {
                reject(err); 
            }else if(result<1){
                resolve(null);
            } else {   //Hodilp mi to tenhle error: resolve(result[0].user_id TypeError: Cannot read properties of undefined (reading 'user_id')
                resolve(result[0].user_id); 
            }
        });
    })
}

//vytvoreni zadosti o pratelstvi
function sendReq(userID, friendID){
    return new Promise((resolve, reject) => {
        let sqlInsertReq = "INSERT INTO friendrequest (user_id, requesting_user_id)"
        +"SELECT ?,? WHERE NOT EXISTS ("
         +  " SELECT * FROM friendpair WHERE (user_id = ? AND friend_user_id = ?)"
        +") AND NOT EXISTS ("
         +   "SELECT * FROM friendrequest WHERE (user_id = ? AND requesting_user_id = ?)"
        +");"
        db.query(sqlInsertReq,[userID, friendID, userID, friendID, userID, friendID], function (err, data) {
            if (err) throw err;
            else resolve("good work")
        })
    })
}
//po potvrzeni zadosti o pratelstvi se vytvori novy par pratel = jsou pratele
function acceptReq(userID, friendID){
    return new Promise((resolve, reject) => {
        let sqlInsertFriendPair = "INSERT INTO friendpair (user_id, friend_user_id) SELECT ?,? UNION ALL SELECT ?, ? WHERE NOT EXISTS (SELECT * FROM friendpair WHERE (user_id = ? AND friend_user_id = ?));"
        db.query(sqlInsertFriendPair, [userID, friendID, friendID, userID, userID, friendID], function (err, data) {
            if (err) throw err;
            else resolve("great work")
        })
    })
}

//smazani zadosti o pratelstvi
function removeReq(userID, friendID){
    return new Promise((resolve, reject) => {
        let sql = 'DELETE FROM friendrequest WHERE user_id = ? AND requesting_user_id = ?;'
        db.query(sql,[friendID, userID], function (err, data) {
            if (err) throw err;
            else resolve("super work")
        })
    })
}

//smazani dvojce pratel
function removeFriend(userID, friendID){
    return new Promise((resolve, reject) => {
        let sql = 'DELETE FROM friendpair WHERE (user_id = ? AND friend_user_id = ?) OR (user_id = ? AND friend_user_id = ?);'
        db.query(sql,[friendID, userID, userID,friendID], function (err, data) {
            if (err) throw err;
            else resolve("super work")
        })
    })
}

//po kliknuti tlacitka
router.post("/", async (req, res)=>{
    let addFriend = req.body.search;
    let friendID
    let userID =  loadedUser.getLogUserId() 
    //zjisti ID kamose kvuli insertu 
    friendID = await loadFriendID(addFriend);
    if (friendID==null){

    }
    //overeni zda si nechces pridat sam sebe
    const nameUser = await nameOfLoadedUser()
    //kdyz si chce pridat sam sebe tak
    if(addFriend==nameUser[0]||addFriend==nameUser[1]){ //nelze pridat sam sebe
        var err = 'Nemůžete si přidat sám sebe!';
        res.render('pratele', {pridatSebe: err,name: nameUser[0], username: nameUser[1], notificationsCount: await lengthNoti()});
    }else if (friendID==null){//uzivatel neexistuje
        var err = "Tento uživatel neexistuje!"
        res.render('pratele', {pridatSebe: err,name: nameUser[0], username: nameUser[1], notificationsCount: await lengthNoti()});
    }else{
        //poslat request do databaze
        await sendReq(userID, friendID);
        res.redirect("/pratele");
    }
    
});

router.post("/accept", async (req, res)=>{
    let friend_name = req.query.friendName.replace(/,/g,'#')
    console.log(friend_name)
    let userID = loadedUser.getLogUserId()
    let friendID = await loadFriendID(friend_name) 
    await acceptReq(userID, friendID)
    await removeReq(userID, friendID)
    res.redirect('/pratele')
})

router.post("/decline", async (req, res)=>{
    let friend_name = req.query.friendName.replace(/,/g,'#')
    let userID = loadedUser.getLogUserId()
    let friendID = await loadFriendID(friend_name) 
    await removeReq(userID, friendID)
    res.redirect('/pratele')
})

router.post("/block", async (req, res)=>{
    let friend_name = req.query.friendName.replace(/,/g,'#')
    let userID = loadedUser.getLogUserId()
    let friendID = await loadFriendID(friend_name) 
    await removeFriend(userID, friendID)
    res.redirect('/pratele')
})



   

module.exports = {router, search};