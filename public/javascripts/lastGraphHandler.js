let lastGraph = document.getElementById("lastActivGraph")

//získá data pro dnou stránku
fetch(location.pathname + location.search,  {headers: {
        'Accept': 'application/json'
      }})
        .then(response => response.json())
        .then(info => {makeHTMLGraph(info)})
        .catch(error => console.error('Error:', error))

//vytvoří html 
function makeHTMLGraph(arrData){
    lastGraph.innerHTML = ''
    if(arrData.lastSixData.length > 0){
        if(arrData.lastSixData[0].activ_type == 'sport'){
            //div pro to aby graf mel dole scrollbar
            let divChartCal = document.createElement('div')
            divChartCal.className = 'containerChart'

            let divCanCal = document.createElement('div')
            divCanCal.className = 'containerBodyCal'

            //aby byl stejny design u všech grafu jiná funkce není
            let fullGraph = document.createElement('div')
            fullGraph.className = 'slider-wrapper'

            let listGraph = document.createElement('div')
            listGraph.style = 'width: 1000px'
            listGraph.className = 'slider'
           fullGraph.innerHTML = '<h2 id="podnadpis" style="padding: 25px;">' + 'Graf poslední přidané aktivity' + '</h2>' +
                      '<h3 id="podnadpis"><i>' + arrData.lastSixData[0].activ_name + '</i></h3>';

            //canvas pro vytvoření grafu
            let canvasCal = document.createElement('canvas')
            canvasCal.id = 'sportGraph'
        
            //přidání divů do html
            divCanCal.appendChild(canvasCal)
            divChartCal.appendChild(divCanCal)
            listGraph.appendChild(divChartCal)
            fullGraph.appendChild(listGraph)

            lastGraph.appendChild(fullGraph)
            if(location.pathname == '/friendProfile'){
                //vytvoří graf poslední aktivity ve friendprofile
                createGraphOfLastActivity(arrData.lastActivG.friendsData[0], canvasCal.id)
            }else{
                //vytvoří graf poslední aktivity v prehledu
                createGraphOfLastActivity(arrData.lastActivG, canvasCal.id)
            }

        }else if(arrData.lastSixData[0].activ_type == 'call'){
            //div pro to aby graf mel dole scrollbar
            let divChartCal = document.createElement('div')
            divChartCal.className = 'containerChart'

            let divCanCal = document.createElement('div')
            divCanCal.className = 'containerBodyCal'

            //aby byl stejny design u všech grafu jiná funkce není
            let fullGraph = document.createElement('div')
            fullGraph.className = 'slider-wrapper'

            let listGraph = document.createElement('div')
            listGraph.style = 'width: 1000px'
            listGraph.className = 'slider'
            fullGraph.innerHTML = '<h2 id="podnadpis" style="padding: 25px; ">'+'Graf posledni pridane aktivity'+'</h2>'+
            '<h3 id="podnadpis">'+arrData.lastSixData[0].activ_name+'</h3>'

            //canvas pro vytvoření grafu
            let canvasCal = document.createElement('canvas')
            canvasCal.id = 'callGraph'

            //přidání divů do html
            divCanCal.appendChild(canvasCal)
            divChartCal.appendChild(divCanCal)
            listGraph.appendChild(divChartCal)
            fullGraph.appendChild(listGraph)

            lastGraph.appendChild(fullGraph)
            if(location.pathname == '/friendProfile'){
                //vytvoří graf poslední aktivity ve friendprofile
                createGraphOfLastActivity(arrData.lastActivG.friendsData[0], canvasCal.id)
            }else{
                //vytvoří graf poslední aktivity v prehledu
                createGraphOfLastActivity(arrData.lastActivG, canvasCal.id)
            }

        }else if(arrData.lastSixData[0].activ_type == 'sleep'){
            //div pro to aby graf mel dole scrollbar
            let divChartCal = document.createElement('div')
            divChartCal.className = 'containerChart'

            let divCanCal = document.createElement('div')
            divCanCal.className = 'containerBodyCal'

            //aby byl stejny design u všech grafu jiná funkce není
            let fullGraph = document.createElement('div')
            fullGraph.className = 'slider-wrapper'

            let listGraph = document.createElement('div')
            listGraph.style = 'width: 1000px'
            listGraph.className = 'slider'
            fullGraph.innerHTML = '<h2 id="podnadpis">'+'Graf posledni pridane aktivity'+'</h2>'+
            '<h3 id="podnadpis">'+arrData.lastSixData[0].activ_name+'</h3>'

            //canvas pro vytvoření grafu
            let canvasCal = document.createElement('canvas')
            canvasCal.id = 'sleepGraph'

            //přidání divů do html
            divCanCal.appendChild(canvasCal)
            divChartCal.appendChild(divCanCal)
            listGraph.appendChild(divChartCal)
            fullGraph.appendChild(listGraph)

            lastGraph.appendChild(fullGraph)

            if(location.pathname == '/friendProfile'){
                //vytvoří graf poslední aktivity ve friendprofile
                createGraphOfLastActivity(arrData.lastActivG.friendsData[0], canvasCal.id)
            }else{
                //vytvoří graf poslední aktivity v prehledu
                createGraphOfLastActivity(arrData.lastActivG, canvasCal.id)
            }
        }
    }else{
        //když ještě není přidaná aktivita
        let div = document.createElement('div')

        div.innerHTML =  '<h2 id="podnadpis" style="padding: 25px; ">'+'Přidejte aktivitu, aby jste viděli graf'+'</h2>'
        lastGraph.appendChild(div)
    }
}

//vytvoří graf
function createGraphOfLastActivity(info, name){
    
    //graf pro spalene kalorie
    if(name == 'sportGraph'){
        var ctx = document.getElementById(name).getContext('2d');
        var myChartSport = new Chart(ctx, {
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
                }
            }
        }
        });
        var xCoordi = makeDateArray(info)
        for(let j = 0; j < xCoordi.length; j++){
            myChartSport.data.labels.push(xCoordi[j].toLocaleDateString('cs-cz'))
        }
        var yCoordiCal = calValues(info, xCoordi)
        myChartSport.data.datasets.push({
            label: 'ty',
            data: yCoordiCal.user,
            borderWidth: 3,
            borderColor: '#e17518',
            backgroundColor: 'rgb(247 201 175)'
        })
        myChartSport.update()

        const conBodyCal = document.querySelector('.containerBodyCal')
        if(myChartSport.data.labels.length > 6){
            const newWidth = 1000 + ((myChartSport.data.labels.length - 6) * 30)
            conBodyCal.style.width = `${newWidth}px`
        }
    }
    //graf spánek
    else if(name == 'sleepGraph'){
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
                         callbacks: {
                            //čas napsaný lépe 
                             label: function(tooltipItem) {
                                 var value = tooltipItem.raw;   
                                 var hours = Math.floor(value / 3600000);
                                 var minutes = Math.floor((value % 3600000) / 60000);
                                 return hours + 'h ' + minutes.toString().padStart(2, '0') + 'min.';
                             }
                         }
                    }
            
            }}
        });
        var xCoordi = makeDateArray(info)
        for(let j = 0; j < xCoordi.length; j++){
            myChartSleep.data.labels.push(xCoordi[j].toLocaleDateString('cs-cz'))
        }
        var yCoordiTime = timeValues(info, xCoordi)
        myChartSleep.data.datasets.push({
            label: 'ty',
            data: yCoordiTime.user,
            borderWidth: 3,
            borderColor: '#932ed9',
            backgroundColor: '#cba5e5',
            text:'délka spánku'
        })
        myChartSleep.update()
        const conBodyCal = document.querySelector('.containerBodyCal')
        if(myChartSleep.data.labels.length > 6){
            const newWidth = 1000 + ((myChartSleep.data.labels.length - 7) * 30)
            conBodyCal.style.width = `${newWidth}px`
        }
    }
    //graf nabrané kalorie
    else if(name == 'callGraph'){
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

        const conBodyCal = document.querySelector('.containerBodyCal')
        if(myChartFood.data.labels.length > 6){
            const newWidth = 1000 + ((myChartFood.data.labels.length - 6) * 30)
            conBodyCal.style.width = `${newWidth}px`
        }
    }
}

//přiřazení hodnot času ke správnému datu
function timeValues(info, arrDates){
    var arrOfVal = {
        user:[],
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
    
    return arrOfVal

}

//přiřazení hodnot kalorii ke správnému datu
function calValues(info, arrDates){
    var arrOfVal = {
        user:[],
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

//vytvoří jedno pole všech datumů mezi nejstarším a nejmladším datem
function makeDateArray(info){
    
    let arrUserDate = arrUserDates(info)

    //nejstarší a nejmladší datum 
    var finalMin = new Date(Math.min(...arrUserDate));
    var finalMax = new Date(Math.max(...arrUserDate));
    
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