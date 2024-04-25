//proměnná, ve které se uloží userID
let user_id

//nastaví a získá userID po přihlášení
function setUser(userID){
    user_id = userID;
}
//vrací userID
function getLogUserId(){
    return user_id
}

module.exports = { getLogUserId:getLogUserId, setUser:setUser}