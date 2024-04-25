//proměnná, ve které se uloží poslední url navštívené důležité stránky
let savedURL

//nastaví url
function setURL(LastUrl){
    savedURL = LastUrl;
}

//vrátí url
function getURL(){
    return savedURL
}

module.exports = { getURL:getURL, setURL:setURL}