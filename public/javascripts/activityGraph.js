let myGraph = document.getElementById('graphs');
//získáme data ze serveru
fetch('/statistiky',  {headers: {
    'Accept': 'application/json'
  }})
    .then(response => response.json())
    .then(info => {makeHtml(info)})
    .catch(error => console.error('Error:', error));
//vytvoříme html
function makeHtml(arrData){
    myGraph.innerHTML = ''
    let index = 0
    //pokud nejsou data napiš No data
    if(arrData.data.activities < 1 && arrData.data.foodG < 1 && arrData.data.sleepG < 1){
        let listGraph = document.createElement('div')
        listGraph.innerHTML = '<h2>No data</h2>'
    }else{
        arrData.nameAllActiv.forEach(activities =>{
            //div pro to aby graf mel dole scrollbar
            let divChartCal = document.createElement('div')
            let divChartDis = document.createElement('div')
            let divChartTime = document.createElement('div')

            divChartCal.className = 'containerChart'
            divChartDis.className = 'containerChart'
            divChartTime.className = 'containerChart'

            //divy který pak slouží k přepínání mezi typem grafu
            let divCanCal = document.createElement('div')
            let divCanDis = document.createElement('div')
            let divCanTime = document.createElement('div')
            
            divCanCal.className = 'containerBodyCal' + activities
            divCanDis.className = 'containerBodyDis' + activities
            divCanTime.className = 'containerBodyTime' + activities

            let refDiv = document.createElement('div')
            refDiv.className = 'slider-nav'

            let fullGraph = document.createElement('div')
            fullGraph.className = 'slider-wrapper'

            let refCal = document.createElement('a')
            let refDis = document.createElement('a')
            let refTime = document.createElement('a')

            let listGraph = document.createElement('div')
            listGraph.style = 'width: 1000px'
            listGraph.className = 'slider'
            fullGraph.innerHTML = '<h2 class="search-item" style="padding: 25px; ">'+activities+'</h2>'

            //canvas pro vytvoření grafu
            let canvasCal = document.createElement('canvas')
            canvasCal.id = activities + 'cal'
            divChartCal.id = canvasCal.id + 'div'
            refCal.href = '#' + divChartCal.id

            let canvasDis = document.createElement('canvas')
            canvasDis.id = activities + 'dis'
            divChartDis.id = canvasDis.id + 'div'
            refDis.href = '#' + divChartDis.id

            let canvasTime = document.createElement('canvas')
            canvasTime.id = activities + 'time'
            divChartTime.id = canvasTime.id + 'div'
            refTime.href = '#' + divChartTime.id

            //přidání divů do html
            refDiv.appendChild(refCal)
            refDiv.appendChild(refDis)
            refDiv.appendChild(refTime)

            divCanCal.appendChild(canvasCal)
            divCanDis.appendChild(canvasDis)
            divCanTime.appendChild(canvasTime)

            divChartCal.appendChild(divCanCal)
            divChartDis.appendChild(divCanDis)
            divChartTime.appendChild(divCanTime)

            listGraph.appendChild(divChartCal)
            listGraph.appendChild(divChartDis)
            listGraph.appendChild(divChartTime)

            fullGraph.appendChild(refDiv)
            fullGraph.appendChild(listGraph)

            myGraph.appendChild(fullGraph)

            // vytváření grafu pro sport
           createGraph(arrData.data.sportG[index], activities)
           index++;
        })
        if(arrData.data.foodG.length > 0){

            //div pro to aby graf mel dole scrollbar
            let divChartFood = document.createElement('div')
            divChartFood.className = 'containerChart'

            let divCanFood = document.createElement('div')
            divCanFood.className = 'containerBodyCalFood' 

            //aby byl stejny design u všech grafu jiná funkce není
            let nameGraph = document.createElement('div')
            nameGraph.className = 'slider-wrapper'

            let calGraph = document.createElement('div')
            calGraph.style = 'width:1000px'
            calGraph.className = 'slider'
            nameGraph.innerHTML = '<h2 class="search-item" style="padding: 25px;">'+'Nabrane Kalorie'+'</h2>'

            //canvas pro vytvoření grafu
            let canvas = document.createElement('canvas')
            canvas.id = 'cal'

            //přidání divů do html
            divCanFood.appendChild(canvas)
            divChartFood.appendChild(divCanFood)
            calGraph.appendChild(divChartFood)
            nameGraph.appendChild(calGraph)
            myGraph.appendChild(nameGraph)

            //vytvoří graf pro nabrané kalorie
           createGraph(arrData.data.foodG[0], canvas.id)

        }if(arrData.data.sleepG.length > 0){
            //div pro to aby graf mel dole scrollbar
            let divChartSleep = document.createElement('div')
            divChartSleep.className = 'containerChart'

            let divCanSleep = document.createElement('div')
            divCanSleep.className = 'containerBodySleep'

            //aby byl stejny design u všech grafu jiná funkce není
            let fullGraph = document.createElement('div')
            fullGraph.className = 'slider-wrapper'

            let sleep = document.createElement('div')
            sleep.style = 'width: 1000px'
            fullGraph.innerHTML = '<h2 class="search-item" style="padding: 25px;">Spanek</h2>'
            sleep.className = 'slider'

            //canvas pro vytvoření grafu
            let canvas = document.createElement('canvas')
            canvas.id = 'sleep'

            //přidání divů do html
            divCanSleep.appendChild(canvas)
            divChartSleep.appendChild(divCanSleep)
            sleep.appendChild(divChartSleep)
            fullGraph.appendChild(sleep)
            myGraph.appendChild(fullGraph)

            //vytvoří graf pro spánek
            createGraph(arrData.data.sleepG[0], canvas.id)
        }
        //po prepinaní okno trochu posune dolu 
        scrollback()
    } 
}

//vytvoří grafy
function createGraph(info, name){
    //pokud je to sport => vytvoř graf  pro aktivitu typu sport
    if(name != 'sleep' && name != 'cal'){
        //graf pro spalene kalorie
        var ctxCal = document.getElementById(name + 'cal').getContext('2d');
        var myChartCal = new Chart(ctxCal, {
        type: 'bar',
        data: { 
           labels: [],
            datasets: []
        },
        options: {
            maintainAspectRatio: false,
            scales:{
                y: {
                    beginAtZero: true,
                    title: {
                    display: true,
                            text: 'Kalorie (Kcal)'
                    }   
                }
            },
            plugins:{
                title: {
                    display: true,
                    text: 'Spálené kalorie v době aktivity'
                },
               
            }
        }
        });
        //graf pro vzdálenost
        var ctxDis = document.getElementById(name + 'dis').getContext('2d');
        var myChartDis = new Chart(ctxDis, {
            type: 'bar',
            data: { 
               labels: [],
                datasets: []
            },
            options: {
                maintainAspectRatio: false,
                scales:{
                    y: {
                        beginAtZero: true,
                        title: {
                        display: true,
                                text: 'Vzdálenost'
                        }   
                    }
                },
                plugins:{
                    title: {
                        display: true,
                        text: 'Zdolaná vzdálenost aktivity'
                    },
                }
            }
        });
        //graf pro trvání aktivity
        var ctxTime = document.getElementById(name + 'time').getContext('2d');
        var myChartTime = new Chart(ctxTime, {
            type: 'bar',
            data: { 
               labels: [],
                datasets: []
            },
            options: {
                maintainAspectRatio: false,
                scales: {  
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                                text: 'Doba trvání aktivity'
                        },
                        ticks: {
                            callback: function(value) {
                                var hours = Math.floor(value / 3600000);
                                var minutes = Math.floor((value % 3600000) / 60000);
                                return hours + 'h ' + minutes.toString().padStart(2, '0')+'min.';
                            }
                        }
                    }
                 },
                 plugins:{
                    tooltip: {
                        //enabled: true,
                         callbacks: {
                            //čas napsaný lépe
                             label: function(tooltipItem) {
                                console.log(tooltipItem)
                                 var value = tooltipItem.raw;   
                                 var hours = Math.floor(value / 3600000);
                                 var minutes = Math.floor((value % 3600000) / 60000);
                                 return hours + 'h ' + minutes.toString().padStart(2, '0') +'min.';
                             }
                         }
                    },
                    title: {
                        display: true,
                        text: 'Doba aktivity'
                    },
            }}
        });
        //přidání x-ových souřednic do grafů
        var xCoordi = makeDateArray(info)
        for(let j = 0; j < xCoordi.length; j++){
            myChartCal.data.labels.push(xCoordi[j].toLocaleDateString('cs-cz'))
            myChartDis.data.labels.push(xCoordi[j].toLocaleDateString('cs-cz'))
            myChartTime.data.labels.push(xCoordi[j].toLocaleDateString('cs-cz'))
        }
        
        //přidání y-ových souřednic do grafu spalené kalorie
        var yCoordiCal = calValues(info, xCoordi)
        myChartCal.data.datasets.push({
            label: 'ty',
            data: yCoordiCal.user,
            borderWidth: 3,
        })

        //přidání y-ových souřednic do grafu vzdálenosti
        var yCoordiDis = disValues(info, xCoordi)
        myChartDis.data.datasets.push({
            label: 'ty',
            data: yCoordiDis.user,
            borderWidth: 3,
        })

        //přidání y-ových souřednic do grafu doba trvání aktivity
        var yCoordiTime = timeValues(info, xCoordi)
        myChartTime.data.datasets.push({
            label: 'ty',
            data: yCoordiTime.user,
            borderWidth: 3,
        })

        let i = 0;
        //přidání y-ových souřednic kamarádů do grafu spalené kalorie
        info.friendsData.forEach(friendGraph => {
            myChartCal.data.datasets.push({
                label: friendGraph.friendsName,
                data: yCoordiCal.friends[i],
                borderWidth: 3
            });
            i++;
        })

        let u = 0
        //přidání y-ových souřednic kamarádů do grafu vzdálenosti
        info.friendsData.forEach(friendGraph => {
            myChartDis.data.datasets.push({
                label: friendGraph.friendsName,
                data: yCoordiDis.friends[u],
                borderWidth: 3
            });
            u++;
        })
        let k = 0;
        //přidání y-ových souřednic kamarádů do grafu doba trvání aktivity
        info.friendsData.forEach(friendGraph => {
            myChartTime.data.datasets.push({
                label: friendGraph.friendsName,
                data: yCoordiTime.friends[k],
                borderWidth: 3
            });
            k++;
        })
        
        myChartDis.update()
        myChartCal.update();
        myChartTime.update()

        //aby grafy nezmenšovali labely
        const conBodyCal = document.querySelector('.containerBodyCal' + name)
        if(myChartCal.data.labels.length > 6){
            const newWidth = 1000 + ((myChartCal.data.labels.length - 6) * 30)
            conBodyCal.style.width = `${newWidth}px`
        }
        const conBodyDis = document.querySelector('.containerBodyDis' + name)
        if(myChartDis.data.labels.length > 6){
            const newWidth = 1000 + ((myChartDis.data.labels.length - 6) * 30)
            conBodyDis.style.width = `${newWidth}px`
        }
        const conBodyTime = document.querySelector('.containerBodyTime' + name)
        if(myChartTime.data.labels.length > 6){
            const newWidth = 1000 + ((myChartTime.data.labels.length - 6) * 30)
            conBodyTime.style.width = `${newWidth}px`
        }
    //graf nabrané kalorie
    }else if(name == 'cal'){
        var ctx = document.getElementById(name).getContext('2d');
        var myChartFood = new Chart(ctx, {
        type: 'line',
        data: { 
           labels: [],
            datasets: []
        },
        options: {
            maintainAspectRatio: false,
            scales:{
                y: {
                    beginAtZero: true,
                    title: {
                    display: true,
                            text: 'Kalorie (Kcal)'
                    }   
                }
            },
            plugins:{
                title: {
                    display: true,
                    text: 'Nabrané kalorie(jídlo, pití, apod.)'
                }
            }
        }
        });
        var xCoordi = makeDateArray(info)
        for(let j = 0; j < xCoordi.length; j++){
            myChartFood.data.labels.push(xCoordi[j].toLocaleDateString('cs-cz'))
        }
        var yCoordiCal = calValues(info, xCoordi)
        myChartFood.data.datasets.push({
            label: 'ty',
            data: yCoordiCal.user,
            borderWidth: 3,
            borderColor: 'lime',
            
        })
        myChartFood.update()

        const conBodyCal = document.querySelector('.containerBodyCalFood')
        if(myChartFood.data.labels.length > 6){
            const newWidth = 1000 + ((myChartFood.data.labels.length - 6) * 30)
            conBodyCal.style.width = `${newWidth}px`
        }
    //graf spánku
    }else if(name == 'sleep'){
        var ctxSleep = document.getElementById(name).getContext('2d');
        var myChartSleep = new Chart(ctxSleep, {
            type: 'bar',
            data: { 
               labels: [],
                datasets: []
            },
            options: {
                maintainAspectRatio: false,
                scales: {  
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                                text: 'Délka spánku'
                            } ,
                        ticks: {
                            //čas napsaný lépe
                            callback: function(value) {
                                var hours = Math.floor(value / 3600000);
                                var minutes = Math.floor((value % 3600000) / 60000);
                                return hours + 'h ' + minutes.toString().padStart(2, '0') + 'min';
                            }
                        }
                    }
                 },
                 plugins:{
                    title: {
                        display: true,
                        text: 'Spánek'
                    },
                    tooltip: {
                        //enabled: true,
                         callbacks: {
                             label: function(tooltipItem) {
                                console.log(tooltipItem)
                                 var value = tooltipItem.raw;   
                                 var hours = Math.floor(value / 3600000);
                                 var minutes = Math.floor((value % 3600000) / 60000);
                                 return hours + 'h ' + minutes.toString().padStart(2, '0') + 'min.';
                             }
                         }
                    }
            
            }}
        });
        //console.log("ak:")
        var xCoordi = makeDateArray(info)
        for(let j = 0; j < xCoordi.length; j++){
            myChartSleep.data.labels.push(xCoordi[j].toLocaleDateString('cs-cz'))
        }
        var yCoordiTime = timeValues(info, xCoordi)
        myChartSleep.data.datasets.push({
            label: 'ty',
            data: yCoordiTime.user,
            borderWidth: 3,
            borderColor: 'rgba(60, 29, 104, 0.8)',
            backgroundColor: 'rgba(108, 37, 208, 0.8)',
            text:'délka spánku'
        })
        myChartSleep.update()
        const conBodyCal = document.querySelector('.containerBodySleep')
        if(myChartSleep.data.labels.length > 6){
            const newWidth = 1000 + ((myChartSleep.data.labels.length - 7) * 30)
            conBodyCal.style.width = `${newWidth}px`
        }
    }

}

//přiřazení hodnot času ke správnému datu
function timeValues(info, arrDates){
    var arrOfVal = {
        user:[],
        friends:[]
    };
    let userDate = arrUserDates(info)
    //přiřadí u usera
    const dateValuesMap = new Map();
    for (let i = 0; i < arrDates.length; i++) {
        dateValuesMap.set(arrDates[i].getTime(), NaN);
    }
    for (let userDateEntry of userDate) { 
        if(info.time[userDate.indexOf(userDateEntry)] < 0){
            const userDateValue =  info.time[userDate.indexOf(userDateEntry)]+ 86400000;
            dateValuesMap.set(userDateEntry.getTime(), userDateValue);
        }else{
            const userDateValue = info.time[userDate.indexOf(userDateEntry)]
            dateValuesMap.set(userDateEntry.getTime(), userDateValue);
        }
            
    }
    for (let [date, value] of dateValuesMap.entries()) {
        arrOfVal.user.push(value);
    }
    //přiřadí u kámoše
    info.friendsData.forEach(friendGraph => {
      let friendDate = arrFriendDates(friendGraph);
      var friendsVal = [];
      for (let k = 0; k < arrDates.length; k++) {
        let friendIndex = friendDate.findIndex(date => date.getTime() === arrDates[k].getTime());
        if (friendIndex !== -1) {
            if(friendGraph.time[friendIndex] < 0){
                const friendValue = friendGraph.time[friendIndex] + 86400000;
                if (!friendsVal.includes(friendValue)) {
                      friendsVal.push(friendValue);
                }
            }else{
                const friendValue = friendGraph.time[friendIndex];
                if (!friendsVal.includes(friendValue)) {
                      friendsVal.push(friendValue);
                }
            }
        } else {
          friendsVal.push(NaN);
        }
      }
      arrOfVal.friends.push(friendsVal);
    });
    
    return arrOfVal

}

//přiřazení hodnot vzdálenosti ke správnému datu
function disValues(info, arrDates){
    var arrOfVal = {
        user:[],
        friends:[]
    };
    let userDate = arrUserDates(info)
    //přiřadí u usera
    const dateValuesMap = new Map();
    for (let i = 0; i < arrDates.length; i++) {
        dateValuesMap.set(arrDates[i].getTime(), NaN);
    }
    for (let userDateEntry of userDate) {
        const userDateValue = info.valuesDis[userDate.indexOf(userDateEntry)];
        dateValuesMap.set(userDateEntry.getTime(), userDateValue);
    }
    for (let [date, value] of dateValuesMap.entries()) {
        arrOfVal.user.push(value);
    }
    //přiřadí u kámoše
    info.friendsData.forEach(friendGraph => {
      let friendDate = arrFriendDates(friendGraph);
      var friendsVal = [];
      for (let k = 0; k < arrDates.length; k++) {
        let friendIndex = friendDate.findIndex(date => date.getTime() === arrDates[k].getTime());
        if (friendIndex !== -1) {
          const friendValue = friendGraph.valuesDis[friendIndex];
          if (!friendsVal.includes(friendValue)) {
                friendsVal.push(friendValue);
          }
        } else {
          friendsVal.push(NaN);
        }
      }
      arrOfVal.friends.push(friendsVal);
    });
    
    return arrOfVal
}



//ziska y souradnice
//přiřazení hodnot kalorii ke správnému datu
function calValues(info, arrDates){
    var arrOfVal = {
        user:[],
        friends:[]
    };
    let userDate = arrUserDates(info)
    //přiřadí u usera
    const dateValuesMap = new Map();
    for (let i = 0; i < arrDates.length; i++) {
        dateValuesMap.set(arrDates[i].getTime(), NaN);
    }
    for (let userDateEntry of userDate) {
        const userDateValue = info.valuesBurnCal[userDate.indexOf(userDateEntry)];
        dateValuesMap.set(userDateEntry.getTime(), userDateValue);
    }
    for (let [date, value] of dateValuesMap.entries()) {
        arrOfVal.user.push(value);
    }
    //přiřadí u kámoše
    info.friendsData.forEach(friendGraph => {
      let friendDate = arrFriendDates(friendGraph);
      var friendsVal = [];
      for (let k = 0; k < arrDates.length; k++) {
        let friendIndex = friendDate.findIndex(date => date.getTime() === arrDates[k].getTime());
        if (friendIndex !== -1) {
          const friendValue = friendGraph.valuesBurnCal[friendIndex];
          if (!friendsVal.includes(friendValue)) {
                friendsVal.push(friendValue);
          } 
        } else {
          friendsVal.push(NaN);
        }
      }
      arrOfVal.friends.push(friendsVal);
    });
    
    return arrOfVal
}

//pole datumů usera
function arrUserDates(data){
    let arrUserDate =[];
    data.labels.forEach(date => {
        arrUserDate.push(new Date(date));
    })
    return arrUserDate;
}

//pole datumů kámoše
function arrFriendDates(data){
    let arrFriendDate =[]
    data.labels.forEach(date => {
        arrFriendDate.push(new Date(date))
    })
    return arrFriendDate;
}

//vytvoří jedno pole všech datumů mezi nejstarším a nejmladším datem
function makeDateArray(info){
    
    let arrUserDate = arrUserDates(info)

    //nejstarší a nejmladší datum usera
    var finalMin = new Date(Math.min(...arrUserDate));
    var finalMax = new Date(Math.max(...arrUserDate));

    //nejstarší a nejmladší datum kámoše
    info.friendsData.forEach(friendGraph => {
        let arrFriendDate = arrFriendDates(friendGraph)

        var friendMin = new Date(Math.min(...arrFriendDate));
        var friendMax = new Date(Math.max(...arrFriendDate));

        if(friendMin < finalMin){
            finalMin = friendMin;
        }
        if(friendMax > finalMax){
            finalMax = friendMax;
        }
    });
    //nesmí být starší než jeden rok než náš nejmladší
    if(finalMax.getFullYear()-1 > finalMin.getFullYear()){
        finalMin =new Date(finalMax.getFullYear()-1, finalMax.getMonth(), finalMax.getDay());
    }
    var finalArr = generateDates(finalMin, finalMax);
    return finalArr;
}

//generuje data mezi nejstarším a nejmladším datem
function generateDates(start, end){
    const currDate = new Date(start.getTime());

    var arrDates = [];

    while(currDate <= end){
        arrDates.push(new Date(currDate));
        currDate.setDate(currDate.getDate() + 1);
    }
    return arrDates;
}

//scrollne trochu dolu
function scrollback(){
    document.querySelectorAll('#graphs a').forEach(function(link) {
        link.addEventListener('click', function(event) {
          var target = this.hash;
          var targetElement = document.querySelector(target);
          if (targetElement) {
            var targetPosition = targetElement.getBoundingClientRect().top - 20; 
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
            setTimeout(function() {
              window.scrollTo({
                top: window.scrollY - 70,
                behavior: 'smooth'
              });
            }, 500);
          }
        });
    });
}
