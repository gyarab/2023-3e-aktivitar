
let reqListFriend = document.getElementById('resultsFriends');
 
//získá data ze serveru
fetch(`/pratele`, {headers: {
    'Accept': 'application/json'
}})
    .then(response => response.json())
    .then(results => displayFriends(results.friends))
    .catch(error => console.error('Chyba při vyhledávání:', error));

//ukáže kamarády usera
function displayFriends(results) {
  reqListFriend.innerHTML = '';
  //pro
  results.forEach(result => {
    const listItem = document.createElement('div');
    // listItem.innerHTML = '<div class = "row" style="font-size: 30px;"><a href="/friendProfile?friendName='+result.split('#')+'">'+'<i class="bx bx-user-circle"></i><label>'+result+'</a> is your friend! </label>'//+ 
    // +'<form class= "friends" id = "friends" action="/pratele/block?friendName='+result.split('#')+'" method="post">'
    // +'<button class="decline" type="submit">Odstranit pritele</button>'+ '</form>'+'</div>' ;

    //kolonka společně s odkazem na friendprofile
    listItem.innerHTML ='<div class="row"><p><a class= "cool-link" href="/friendProfile?friendName='+result.split('#')+'"><i class="bx bx-user-circle"></i>'+result+'</a> is your friend!</p>'
    +'<form class= "friends" id = "friends" action="/pratele/block?friendName='+result.split('#')+'" method="post">'
    +'<button class="decline" type="submit">Odstranit přítele</button>'+'</form>'+'</div>';

    reqListFriend.appendChild(listItem);
  });
}