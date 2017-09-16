 var oSearch = document.querySelector("#search");
 oSearch.value = localStorage.searchTxt;
 oSearch.onkeyup = function(event) {
   if (event.keyCode === 13) {
     location.href = 'search.html?search_text=' + this.value;
   }
 localStorage.searchTxt = this.value;
}
                
    var oSearchText=document.querySelector("#searchText")
    oSearchText.onclick=function(event){
        location.href = 'search.html?search_text=' + localStorage.searchTxt;
}