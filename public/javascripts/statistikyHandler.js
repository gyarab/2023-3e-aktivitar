//vyhledávání ve statistikach podle h2
function searchFunction() {
  var input, filter, divs, h2, txtValue;
  input = document.getElementById('searchInput');
  //převede na FOTBAL = fotbal
  filter = input.value.toUpperCase();
  divs = document.getElementsByClassName('slider-wrapper');
  for (var i = 0; i < divs.length; i++) {
    h2 = divs[i].getElementsByTagName('h2')[0];
    txtValue = h2.textContent || h2.innerText;
    //to co neobsahuje znaky, tak smaže/zakryje
    //a zbytek se ukáže
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      divs[i].style.display = "";
    } else {
      divs[i].style.display = "none";
    }
  }
}