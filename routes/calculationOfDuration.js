//spočítá dobu trvání
function calculateTime(timeFrom, timeTo){
    //převede na datum, od kdy se v programovaní začl měřit čas
    let start = new Date("1970-01-01T" +timeFrom).getTime()
    timeFrom = timeFrom.split(':')
    if(timeTo != null){
       let end = new Date("1970-01-01T" +timeTo).getTime()
       //časy se mezi sebou odečtou
       return end - start
    }else{
        return start
    }
}
module.exports = {calculateTime}