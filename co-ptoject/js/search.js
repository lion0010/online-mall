 var oSearch = document.querySelector("#search");
 oSearch.onkeyup = function(event) {
   if (event.keyCode === 13) {
     location.href = 'search.html?search_text=' + this.value;
   }
 }