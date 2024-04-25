const express = require('express');
const router = express();
const db = require('../database');
const loadUserID = require("./userID");
const lastUrlPart = require("./lastURL")

//pridat activity log
router.post('/', function (req,res){

    var user_id = loadUserID.getLogUserId()
    var typ_activ =req.query.activtype;
 
    //diky string query dostaneme o jaky typ aktivity se jedna a nasledne provedeme insert do DB
    if(typ_activ=="sport"){ //sport
        //nacteni dat pro sport z ejs
        const inputData = {
            activ_name: req.body.activName,
            activ_date:  req.body.activDate,
            activ_timeFr: req.body.activFrTime,
            activ_timeTo: req.body.activToTime,
            activ_distance:  req.body.activDistance,
            activ_cal:  req.body.activCal
        }

        //prepsat to bez sql injection = hotove
         var sql = "INSERT INTO activity_log (user_id, activ_type,activ_name, activ_date, activ_timeFr, activ_timeTo, activ_distance, activ_cal) VALUES  (?,?,?,?,?,?,?,?)";

        db.query(sql,[user_id,typ_activ, inputData.activ_name,inputData.activ_date,inputData.activ_timeFr,inputData.activ_timeTo, inputData.activ_distance, inputData.activ_cal], function(err,result){
            if(err) throw err
            console.log("Activity add correctly?");
        });
 
     }else if(typ_activ=="call"){   // jidlo
        const inputData = {
            activ_name:  req.body.callName,
            activ_date:  req.body.callDate,
            activ_timeFr:  req.body.callTime,
            activ_cal:  req.body.calCalories //pridani kalorii
        }
 
        var sql = "INSERT INTO activity_log (user_id, activ_type, activ_name, activ_date, activ_timeFr, activ_cal) VALUES (?,?,?,?,?,?) ";
        db.query(sql,[user_id,typ_activ,inputData.activ_name,inputData.activ_date, inputData.activ_timeFr, inputData.activ_cal], function(err,result){
            if(err) throw err
            console.log("Food add correctly?");
        });
 
     }else if(typ_activ=="sleep"){
        inputData = {
            activ_date:  req.body.sleepDate,
            activ_timeFr:  req.body.sleepFrTime,
            activ_timeTo:  req.body.sleepToTime,
        }
        var sql = "INSERT INTO activity_log (user_id, activ_type, activ_date, activ_timeFr, activ_timeTo) VALUES (?,?,?,?,?)";
        db.query(sql,[user_id,typ_activ,inputData.activ_date,inputData.activ_timeFr,inputData.activ_timeTo], function(err,result){
            if(err) throw err
            console.log("Sleep add correctly?");
        });
 
     }else if(typ_activ=="book"){
 
     }
   
    res.redirect("/"+lastUrlPart.getURL())
 });

module.exports = router;