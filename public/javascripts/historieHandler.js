
var newFrame = document.getElementById("activityFrame");
var nadpisKarticek = document.getElementById("nadpisKartickyArr");
fetch(`/historie`+location.search, {headers: {
    'Accept': 'application/json'
}})
    .then(response => response.json())
    .then(activities =>  displaySport(activities))
    .catch(error => console.error('Chyba při vyhledávání:', error));

function displaySport(activities){
  newFrame.innerHTML = '';
  nadpisKarticek.innerHTML = '';
  
  const nadpis = document.createElement('h1');
      activities.forEach(result => {
        const listItemSport = document.createElement('div');
        
        if(result.activ_type=='sport'){
          listItemSport.innerHTML = '<div id="sport" class="card" onclick = "zmenaZaznamSport('+result.activity_log_id+')"><div class="card-image-sport"> </div><div class="card-title">'+result.activ_name+'</div>        <div class="card-text"><h3 id="1label111">Datum:  '+new Date(result.activ_date).toLocaleDateString('cs-cz')+'</h3><h3 id="1label21">Od:   '+displayTimeWS(result.activ_timeFr)+'</h3><h3 id="1label12">Do:   '+displayTimeWS(result.activ_timeTo)+'</h3><h3 id="1label13"> Vzdálenost:   '+result.activ_distance+'</h3><h3 id="1label14"> Kalorie:    '+result.activ_cal+'</h3> </div> </div>';
          newFrame.appendChild(listItemSport);

          //nadpis
          nadpis.innerHTML = '<h1 style="text-align: center; font-size: 150%; color: white; margin-bottom:20px;">HISTORIE AKTIVIT</h1>';

          
      }else if (result.activ_type == 'call'){
          
          listItemSport.innerHTML = '<div id="calories" class="card" onclick = "zmenaZaznamCall('+result.activity_log_id+')"><div class="card-image-call"></div><div class="card-title">'+result.activ_name+'</div>        <div class="card-text"><h3 id="1label111">Datum:  '+ new Date(result.activ_date).toLocaleDateString('cs-cz')+'</h3><h3 id="1label21">Čas zápisu:  '+displayTimeWS(result.activ_timeFr)+'</h3><h3 id="1label14">Kalorie:   '+result.activ_cal+'</h3> </div> </div>'    
          newFrame.appendChild(listItemSport)
          
          //nadpis
          nadpis.innerHTML = '<h1 style="text-align: center; font-size: 150%; color: white; margin-bottom:20px;">HISTORIE PŘÍJMU POTRAVY</h1>';
          
      }else if (result.activ_type == 'sleep'){
          listItemSport.innerHTML = '<div id="sleep" class="card" onclick = "zmenaZaznamSleep('+result.activity_log_id+')" ><div class="card-image-sleep"></div><div class="card-title">Spánek</div>        <div class="card-text"><h3 id="1label111">Datum: '+ new Date(result.activ_date).toLocaleDateString('cs-cz')+'</h3><h3 id="1label21"> Večerka:   '+displayTimeWS(result.activ_timeFr)+'</h3><h3 id="1label12">Probuzení:  '+displayTimeWS(result.activ_timeTo)+'</h3><h3 id="1label13">Celkový čas:  '+calculTime(result.activ_timeFr, result.activ_timeTo)+'</h3> </div> </div>'    
          newFrame.appendChild(listItemSport)

          //nadpis
          nadpis.innerHTML = '<h1 style="text-align: center; font-size: 150%; color: white; margin-bottom:20px;">HISTORIE SPÁNKU</h1>';
          
      }});  
    
    nadpisKarticek.appendChild(nadpis);  

  }

 
function zmenaZaznamSport(id){
  window.location.href = "/zmenaZaznam?activtype=sport&id="+id;
}
function zmenaZaznamCall(id){
  window.location.href = "/zmenaZaznam?activtype=call&id="+id;
}
function zmenaZaznamSleep(id){
  window.location.href = "/zmenaZaznam?activtype=sleep&id="+id;
}


function displayTimeWS(timeString){
  const [hoursStr, minutesStr] = timeString.split(':');
      
  // Parse hours and minutes as integers
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  
  // Return an object containing hours and minutes
  return hours +":"+ minutes;
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
