let reqListReq = document.getElementById('resultsReq');


//získáme data ze serveru  
fetch(`/pratele`, {headers: {
    'Accept': 'application/json'
}})
    .then(response => response.json())
    .then(results => displayRequests(results.request))
    .catch(error => console.error('Chyba při vyhledávání:', error));

//ukáže všechny žádosti
function displayRequests(results) {
  reqListReq.innerHTML = '';
  //pro každou žádost vytvoř kolonku 
  results.forEach(result => {
    const listItem = document.createElement('div');
    // listItem.innerHTML = '<div class = "row">'+ '<label>'+result+' wants to be friend with you! </label>'+ 
    // '<form class= "form-group" id = "friends" action="/pratele/accept?friendName='+result.split('#')+'" method="post">'+
    // '<button class="accept" type="submit">Accept</button>'+ '</form>'
    // +'<form class= "form-group" id = "friends" action="/pratele/decline?friendName='+result.split('#')+'" method="post">'
    // +'<button class="decline" type="submit">Decline</button>'+ '</form>'+'</div>';

    //je to s odkazem na friend profile
    listItem.innerHTML = '<div class = "row"><p><a class= "cool-link" href="/friendProfile?friendName='+result.split('#')+'"><i class="bx bx-user-circle"></i>'+result+'</a> wants to be friend with you!</p> <form class= "form-group" id = "friends" action="/pratele/accept?friendName='+result.split('#')+'" method="post"><button class="accept" type="submit">Potvrdit</button></form><form class= "form-group" id = "friends" action="/pratele/decline?friendName='+result.split('#')+'" method="post"><button class="decline" type="submit">Odmítnout</button></form></div>'
    reqListReq.appendChild(listItem);
  });
}