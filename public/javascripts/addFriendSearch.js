const searchInput = document.getElementById('search');
const suggestionsList = document.getElementById('resultsSearch');


//na každý event pro searchbar
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    suggestionsList.innerHTML = '';
    return;
  }
  
  //dostane data podle toho, co je napsáno v searchbaru
  fetch(`/pratele?term=${encodeURIComponent(searchTerm)}`, {headers: {
    'Accept': 'application/json'
  }})
    .then(response => response.json())
    .then(results => displaySuggestions(results.search))
    .catch(error => console.error('Chyba při vyhledávání:', error));
});

//ukáže seznam přátel
function displaySuggestions(results) {
  suggestionsList.innerHTML = '';
  //pro každý výsledek vytvoř odrazku s jmena usera
  results.forEach(result => {
    const listItem = document.createElement('ul');
    listItem.onclick = function(){
      searchInput.value = result
      suggestionsList.innerHTML = ''
    }
    listItem.textContent = result;
    suggestionsList.appendChild(listItem);
  });
}