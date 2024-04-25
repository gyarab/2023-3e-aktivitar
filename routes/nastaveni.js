const express = require('express');
const router = express();
const db = require('../database');
const user_id = require("./userID");


router.post('/accept', function(req, res){
    var height = req.body.heightInput; //nactee data ktere pak ulozime
    var weight = req.body.weightInput;
    var age = req.body.ageInput;

    var userID = user_id.getLogUserId(); //user id


    // v DB je user_id PK => nejde vlozit vice zaznamu ke stejnemu uzivateli, logicky
    //tzn kdyz uz zaznam je tak to skonci errorem = udela se automaticky update, 
    var sql = 'INSERT INTO body_setting(user_id, height, weight, age) VALUES (?,?,?,?)'
    db.query(sql,[userID, height, weight, age], function(err,result){
        if(err){
            console.log("nefunguje");
            var sqlUpdate = 'UPDATE body_setting SET height = ?, weight = ?, age = ? WHERE user_id = ?;'
            db.query(sqlUpdate,[ height, weight, age, userID], function(err,result){
        if(err) throw err
        console.log("Body updated correctly");
    });
        }
        console.log("Body settings add correctly");
    });
    res.redirect('/nastaveni')
})
router.post('/delete', function (req,res) {
    var userID = user_id.getLogUserId();

    let sql = "DELETE from body_setting WHERE user_id = ?;"

    db.query(sql,[userID], function(err, result, fields){
        if (err) throw err
        console.log("Delete was succesfull");
    })
        res.redirect('/nastaveni')
})




module.exports = router;