const express = require('express');
const router = express();
const db = require('../database');
const user_id = require("./userID");
const bcrypt = require('bcrypt'); 

//ulozime bio z text area v browseru
router.post('/saveBio', function(req,res) {
    var userID = user_id.getLogUserId()
    var bio =  req.body.BioTextarea;
    var sql = "INSERT INTO user_profile VALUES (?,?)"
    db.query(sql, [userID, bio], function(err, result){
        if (err){
            var sqlUpdate = 'UPDATE user_profile SET bio = ?WHERE user_id = ?;'
            db.query(sqlUpdate,[ bio, userID], function(err,result){
                if(err) throw err
                console.log("Body updated correctly");
            });
        }
    })
    res.redirect('/profile')
})
//zmena hesla
router.post('/changePassword', async(req,res)=> {
    var newPass = req.body.newPassword
    var newPassConfi = req.body.newPassConfi;
    var userID = user_id.getLogUserId()

    if (newPass==newPassConfi){
        const hashPassword = await bcrypt.hash(newPass, 10); // zasifrovani hesla
        var sql = "UPDATE users SET user_password = ? WHERE user_id = ?;"
        db.query(sql, [hashPassword,userID], function(err, result){
            if (err) throw err
            console.log("Heslo zmeneno uspesne");
        })
    }
    res.redirect('/profile')
})

module.exports = router;