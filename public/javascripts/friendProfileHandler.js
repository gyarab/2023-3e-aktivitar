let reqLastSix = document.getElementById('kartickyLastSix');
//let labelnazev1 = document.getElementById('1labelnazev');
//promin krystofe simon to cely krasne pripravil v tom prehldeHandleru.js
// reference gridu
var grid = document.querySelector(".grid");
// Vytvoreni reference na ty framy
var aktivitaFrameTemplate = document.getElementById("aktivitaKarta").cloneNode(false);
var jidloFrameTemplate = document.getElementById("jidloframe").cloneNode(false);
var spanekFrameTemplate = document.getElementById("spanekframe").cloneNode(false);
var zapisFrameTemplate = document.getElementById("zapisframe").cloneNode(false);
var emptyFrameTemplate = document.getElementById("emptyframe").cloneNode(true);
 
//pridani spravnych framu podle toho co je v databazi
//"typ" znamena o jaky typ aktivity se jedna
 //pouze ukazka: rekneme ze jsou zde 2 zaznamy a kazdej z nich je typ: "aktivita"
  
fetch(`/friendProfile`+location.search, {headers: {
    'Accept': 'application/json'
}})
    .then(response => response.json())
    .then(lastSix =>  displayLastSix(lastSix.lastSixData))
    .catch(error => console.error('Chyba při vyhledávání:', error));

    //logika, ted se to zobrazi spatne, ale arr se opravi na tech sest karticek - divu
    //pak se to hezky ulozi do kazdeho divu jedna ta aktivita a nadhera mame to

document.getElementById("BioTextarea").disabled = true;

function displayLastSix(lastSix) {
  reqLastSix.innerHTML = '';
  let pocetpolozekvDB = 0//tady se zjisti pocet polozek v DB a ulozi se to te promenne (pro tzatim rekneme ze jsou tam 2)
  lastSix.forEach(result => {
    var newFrame;
    const listItemSport = document.createElement('div');
    if(result.activ_type=='sport'){
        //let sportKarticka = document.getElementById(arrDiv.at(i));
        newFrame = aktivitaFrameTemplate.cloneNode(false);
        newFrame.onclick = function() { window.location.href = '/pridatZaznam?activtype=sport'; }
        //listItemSport.innerHTML = '<h2 id="1labelnazevAktvita">'+result.activ_name+'</h2><h3 id="1label111">'+result.activ_date+'</h3><h3 id="1label21">'+result.activ_timeFr+'</h3><h3 id="1label12">'+result.activ_timeTo+'</h3><h3 id="1label13">'+result.activ_distance+'</h3><h3 id="1label14">'+result.activ_cal+'</h3> '    
        listItemSport.innerHTML = '<div id="sport" class="card"><div class="card-image-sport"> </div><div class="card-title">'+result.activ_name+'</div>        <div class="card-text"><h3 id="1label111">Datum:  '+new Date(result.activ_date).toLocaleDateString('cs-cz')+'</h3><h3 id="1label21">Od:   '+result.activ_timeFr+'</h3><h3 id="1label12">Do:   '+result.activ_timeTo+'</h3><h3 id="1label13"> Vzdálenost:   '+result.activ_distance+'</h3><h3 id="1label14"> Kalorie:    '+result.activ_cal+'</h3> </div> </div>'
        newFrame.appendChild(listItemSport);
        pocetpolozekvDB += 1;
    }else if (result.activ_type == 'call'){
        newFrame = aktivitaFrameTemplate.cloneNode(false);
        newFrame.onclick = function() { window.location.href = '/pridatZaznam?activtype=call'; }
        listItemSport.innerHTML = '<div id="calories" class="card"><div class="card-image-call"></div><div class="card-title">'+result.activ_name+'</div>        <div class="card-text"><h3 id="1label111">Datum:  '+ new Date(result.activ_date).toLocaleDateString('cs-cz')+'</h3><h3 id="1label21">Čas zápisu:  '+result.activ_timeFr+'</h3><h3 id="1label14">Kalorie:   '+result.activ_cal+'</h3> </div> </div>'    
        newFrame.appendChild(listItemSport)
        pocetpolozekvDB += 1;
    }else if (result.activ_type == 'sleep'){
        newFrame = aktivitaFrameTemplate.cloneNode(false);
        newFrame.onclick = function() { window.location.href = '/pridatZaznam?activtype=sleep'; }
        listItemSport.innerHTML = '<div id="sleep" class="card"><div class="card-image-sleep"></div><div class="card-title">Spánek</div>        <div class="card-text"><h3 id="1label111">Datum: '+ new Date(result.activ_date).toLocaleDateString('cs-cz')+'</h3><h3 id="1label21"> Večerka:   '+result.activ_timeFr+'</h3><h3 id="1label12">Probuzení:  '+result.activ_timeTo+'</h3><h3 id="1label13">Celkový čas:  '+calculTime(result.activ_timeFr, result.activ_timeTo)+'</h3> </div> </div>'    
        newFrame.appendChild(listItemSport)
        pocetpolozekvDB += 1;
    }else if (result.activ_type == 'book'){//TODO nevim co to bere z databaze
        newFrame = zapisFrameTemplate.cloneNode(false);
        newFrame.onclick = function() { window.location.href = '/pridatZaznam?activtype=book'; }
        listItemSport.innerHTML = '<h2 id="1labelnazevAktvita">'+result.activ_name+'</h2><h3 id="1label111">'+new Date(result.activ_date).toLocaleDateString('cs-cz')+'</h3><h3 id="1label21">'+result.activ_timeFr+'</h3><h3 id="1label12">'+result.activ_timeTo+'</h3><h3 id="1label13">'+result.activ_distance+'</h3><h3 id="1label14">'+result.activ_cal+'</h3> '    
        newFrame.appendChild(listItemSport)
        pocetpolozekvDB += 1;
    }
    newFrame.style.display = "block"; // Make the new frame visible
    grid.appendChild(newFrame);
  });
  for (var i = 0; i < 6 - pocetpolozekvDB; i++) {
    var newEmptyFrame = emptyFrameTemplate.cloneNode(true);
    newEmptyFrame.style.display = "";
    grid.appendChild(newEmptyFrame);
  }
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
  }};