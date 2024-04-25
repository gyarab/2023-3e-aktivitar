var frame = document.getElementById("divpopup");
var divDelete = document.getElementById("div-delete");

    document.getElementById("popup").style.display = "block";

//presun dat pomoci metody fetch
fetch(`/zmenaZaznam`+location.search, {headers: {
    'Accept': 'application/json'
}})
    .then(response => response.json())
    .then(activity =>  displayActivity(activity))
    .catch(error => console.error('Chyba při vyhledávání:', error));

    function displayActivity(activity) {

        frame.innerHTML = '';
        divDelete.innerHTML = '<form class= "nastaveniPost" id = "nastaveniPostDelete" action="/zmenaZaznam/delete'+location.search+'" method="post"><button id="delete-btn" type="submit" class="delete-btn">SMAZAT</button></form>'
    
    activity.forEach(result =>{
        const listItem = document.createElement('div');
        //pro kazdou jinou aktivitu je jiny typ karticky, lisi se napr poctem radku
        // vytvarime html kod ktery nasledne posilame do prohlizece 
        if (result.activ_type=='sport'){
            listItem.innerHTML = '<form class="nastaveniPost" id="nastaveniPost" action="/zmenaZaznam/change'+location.search+'" method="post"> '+
                        '<div id="sport" class="card" style="height:auto; margin-left:-10px"> \
                          <div></div> \
                          <div class="card-title" style="margin-top:-60px;">'+displayDate(result.activ_name)+'</div> \
                          <div style="margin-top:-15px;" class="card-text"> \
                            <label for="activityDate" style="font-size: 18px; font-weight: bold; margin-right: 10px;">Datum:</label> \
                            <input value="'+displayDate(result.activ_date)+'" class="field" type="date" id="activDate" name="activDate" style="padding: 10px; font-size: 14px; margin-top: 10px;" required> \
                            <p style="font-size: 18px; font-weight: bold; margin-right: 10px; margin-bottom: 5px;">Napište název aktivity:</p> \
                            <input value="'+result.activ_name+'" class="field" type="text" id="activName" name="activName" style="width: calc(50% - 10px); padding: 10px; font-size: 16px; width: 100%;" placeholder="Název aktivity" required> \
                            <div style="margin-bottom: 20px;"> \
                              <p style="font-size: 18px; font-weight: bold; margin-right: 17px; margin-bottom: 5px;">Vyberte čas:</p> \
                              <div style="display: flex; justify-content: center; margin-left: -6%;"> \
                                <div style="margin-right: 10%;"> \
                                  <label for="fromTime" style="font-size: 16px;">Od:</label> \
                                  <input value="'+result.activ_timeFr+'" class="field" type="time" id="activFrTime" name="activFrTime" style="font-size: 14px; width: 120%; height: 40px;" required> \
                                </div> \
                                <div> \
                                  <label for="toTime" style="font-size: 16px;">Do:</label> \
                                  <input value="'+result.activ_timeTo+'" class="field" type="time" id="activToTime" name="activToTime" style="font-size: 14px; width: 120%; height: 40px;" required> \
                                </div> \
                              </div> \
                            </div> \
                          </div> \
                          <div style="margin-bottom:20px; margin-top:-35px"> \
                            <p style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">Vzdálenost:</p> \
                            <input value="'+result.activ_distance+'" class="field" type="number" id="activDistance" name="activDistance" style="width: 100%; padding: 10px; font-size: 14px;" placeholder="Vzdálenost v km" min="1" max="999" required> \
                          </div> \
                          <div style="margin-bottom: 20px;"> \
                            <p style="font-size: 18px; font-weight: bold; margin-bottom: 5px; margin-top:-35px">Kalorie:</p> \
                            <input value="'+result.activ_cal+'" class="field" type="number" id="activCal" name="activCal" style="width: 100%; padding: 10px; font-size: 14px;" placeholder="Počet spálených kalorií" min="1"  required> \
                          </div> \
                        </div> \
                        <button id="change-btn" type="submit" class="change-btn">Potvrdit</button> \
                        </form>';

          

            frame.appendChild(listItem)
        }else if (result.activ_type == 'call') {
            listItem.innerHTML = ' <form class= "nastaveniPost" id = "nastaveniPost" action="/zmenaZaznam/change'+location.search+'" method="post"><div id="call" class="card" style="height:auto; margin-left:-10px; background: linear-gradient(to bottom, #a5ffb9, #1bff4c);" ><div></div><div class="card-title" style="margin-top:-60px;"> </div><div style="margin-top:-15px;" class="card-text"><label for="activityDate" style="font-size: 18px; font-weight: bold; margin-right: 10px; margin-bottom: 5px;">Datum:</label><input value="' + displayDate(result.activ_date) + '" class="field" type="date" id="callDate" name="callDate" style="padding: 10px; font-size: 14px;" required><p style="font-size: 18px; font-weight: bold; margin-right: 10px; margin-bottom: 5px; ">Napište název jídla:</p><input value="' + result.activ_name + '" class="field" type="text" id="callName" name="callName" style="width: calc(50% - 10px); padding: 10px; font-size: 14px; width: 100%" placeholder="Název jídla" required><div style="margin-bottom: 20px;"><p style="font-size: 18px; font-weight: bold; margin-right: 0px; margin-bottom: 5px;">Vyberte čas:</p><div style="display: flex; justify-content: center;"><div style="margin-right: 15px;"><input value="' + result.activ_timeFr + '" class="field" type="time" id="callTime" name="callTime" style="font-size: 14px; width: 120%; height: 40px;" placeholder="Čas příjmu" required></div></div></div><div style="margin-bottom: 20px;"><p style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">Kalorie:</p><input value="' + result.activ_cal + '" class="field" type="number" id="calCalories" name="calCalories" style="width: 100%; padding: 10px; font-size: 14px;" placeholder="Počet přijmutých kalorií" min="1" max="9999" required></div></div></div><button id="change-btn" type="submit" class="change-btn">Potvrdit</button></form>'  

            frame.appendChild(listItem)
        }else if (result.activ_type=='sleep'){
            listItem.innerHTML = '<form class= "nastaveniPost" id = "nastaveniPost" action="/zmenaZaznam/change'+location.search+'" method="post"><div id="sleep" class="card" style="height:auto; margin-left:-10px" ><div> </div><div class="card-title" style="margin-top:-60px;"></div><div style="margin-top:-15px;" class="card-text"><label for="activityDate" style="font-size: 18px; font-weight: bold; margin-right: 10px;">Datum:</label><input value="' + displayDate(result.activ_date) + '" class= "field" type="date" id="sleepDate" name="sleepDate" style="padding: 10px; font-size: 14px;" required><p style="font-size: 18px; font-weight: bold; margin-right: 20px; margin-bottom: 5px;">Vyberte čas:</p><div style="display: flex; justify-content: center; margin-right: 8%;"><div style="margin-right: 25px;"><label for="fromTime" style="font-size: 16px;">Od:</label><input value="' + result.activ_timeFr + '" class= "field" type="time" id="sleepFrTime" name="sleepFrTime" style="font-size: 14px; width: 120%; height: 40px;" required></div><div><label for="toTime" style="font-size: 16px;">Do:</label><input value="' + result.activ_timeTo + '" class= "field" type="time" id="sleepToTime" name="sleepToTime" style="font-size: 14px; margin-bottom: 20px; width: 120%; height: 40px;" required></div></div></div><button id="change-btn" type="submit" class="change-btn">Potvrdit</button></form> '
        
        
            frame.appendChild(listItem)
        } 
    })
}

// funkce vygenerovane chatGPT
function displayTimeWS(timeString){
    const [hoursStr, minutesStr] = timeString.split(':');
        
    // Parse hours and minutes as integers
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    
    // Return an object containing hours and minutes
    return hours +":"+ minutes;
  }
function displayDate(dateS){
    const [dateX, endDate] = dateS.split('T');
        
    // Parse hours and minutes as integers
    const date = dateX;

    // Return an object containing hours and minutes
    return date;
}  
  
  function calculTime(time1, time2){
  
  
  // Parse time strings into hours and minutes
  const [hours1, minutes1] = time1.split(':').map(Number);
  const [hours2, minutes2] = time2.split(':').map(Number);
  
  // Calculate total minutes for each time
  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;
  
  // Calculate the time difference in minutes
  const timeDifferenceMinutes = Math.abs(totalMinutes2 - totalMinutes1);
  
  // Convert minutes to hours and minutes
  const hoursDifference = Math.floor(timeDifferenceMinutes / 60);
  const minutesDifference = timeDifferenceMinutes % 60;
  
  
  //jestli to trvalo dele nez hodinu vratit takovyto string
  if(hoursDifference<1){
    return timeDifferenceMinutes + "min.";
  }else if(minutesDifference>0) {
    return hoursDifference +" hod."+ minutesDifference + "min.";
  }else {
    return hoursDifference +" hod."
  }}