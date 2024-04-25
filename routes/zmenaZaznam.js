const express = require('express');
const router = express();
const db = require('../database');


//zmena zaznamu, udelame zmenu pro vsechny aktivity zvlast
router.post('/change', function (req,res){
    var activ_type = req.query.activtype; //typ aktivity
    var activ_log_id = req.query.id; //id zaznamu

   //chceme updatovat zaznam v DB; 
    if(activ_type == "sport"){
        //inputData vezme z textFieldu v browseru 
        const inputDataSport = {
            activ_name: req.body.activName,
            activ_date:  req.body.activDate,
            activ_timeFr: req.body.activFrTime,
            activ_timeTo: req.body.activToTime,
            activ_distance:  req.body.activDistance,
            activ_cal:  req.body.activCal
        }
        let sql = "UPDATE activity_log SET activ_name = ?, activ_date = ?, activ_timeFr = ?, activ_timeTo = ?, activ_distance =?, activ_cal = ?  WHERE activity_log_id = ?;" 
        db.query(sql,[inputDataSport.activ_name, inputDataSport.activ_date, inputDataSport.activ_timeFr, inputDataSport.activ_timeTo, inputDataSport.activ_distance, inputDataSport.activ_cal, activ_log_id ], function(err, result, fields){
            if (err) throw err
            console.log("Change was succesfull");
        })
    } else if(activ_type == "call"){
        const inputDataCall = {
            activ_name: req.body.callName,
            activ_date:  req.body.callDate,
            activ_timeFr: req.body.callTime,
            activ_cal:  req.body.calCalories
        }
        let sql = "UPDATE activity_log SET activ_name = ?, activ_date = ?, activ_timeFr = ?, activ_cal = ?  WHERE activity_log_id = ?;" 
        db.query(sql,[inputDataCall.activ_name, inputDataCall.activ_date, inputDataCall.activ_timeFr, inputDataCall.activ_cal, activ_log_id], function(err, result, fields){
            if (err) throw err
            console.log("Change was succesfull");
        })
    } else if(activ_type == "sleep"){
        const inputDataSleep = {
            activ_date:  req.body.sleepDate,
            activ_timeFr: req.body.sleepFrTime,
            activ_timeTo: req.body.sleepToTime,
        }
        let sql = "UPDATE activity_log SET activ_date = ?, activ_timeFr = ?, activ_timeTo = ? WHERE activity_log_id = ?;" 
        db.query(sql,[ inputDataSleep.activ_date, inputDataSleep.activ_timeFr, inputDataSleep.activ_timeTo, activ_log_id], function(err, result, fields){
            if (err) throw err
            console.log("Change was succesfull");
        })
    }
    res.redirect('/historie')

})



//vezme id zaznamu z query stringu a vymaze konrketni zaznam
router.post('/delete', function (req,res) {
    const type = req.query.activtype;
    const activ_log_id = req.query.id;
    console.log(type,activ_log_id);
    let sql = "DELETE FROM activity_log WHERE activity_log_id = ?;"

    db.query(sql,[activ_log_id], function(err, result, fields){
        if (err) throw err
        console.log("Delete was succesfull");
    })
        res.redirect('/historie')
})

module.exports = router;