var db = require("../database")
var user_id = require("./userID")

//nacte vysku vahu vek u usera podle user id
function getBodySetting(){
    var userID = user_id.getLogUserId();
    return new Promise((resolve, reject) => {
        let sql = "SELECT height,weight,age FROM body_setting WHERE user_id = ?;"
        db.query(sql,[userID], function (err, result, fields) {
            if (err) {
                reject(err);  
            }else if(result<1) {
                resolve([{ height: 'No data', weight: 'No data', age: 'No data'} ])
            }else {   
                resolve(result);
            }
        });
    })
}
//smaze zaznam v body_setting podle user_id
function deleteBodySetting(){
    var userID = user_id.getLogUserId();

    let sql = "DELETE from body_setting WHERE user_id = ?;"

    db.query(sql,[userID], function(err, result, fields){
        if (err) throw err
        console.log("Delete was succesfull");
    })

}

module.exports = {getBodySetting, deleteBodySetting}