// main variables the code will be working with.
let url = "https://api.myjson.com/bins/zyv02";
let data;
let books;
let catalogue;
let sorter;

requestData();


function requestData() {

  fetch(url)
  .then(function(response) {
    if (response.ok) {
      return response.json();
    }

  }).then(function(json) {

    data = json; // defines a variable equivalent to the JSON file so it is possible to work with that information.
    books = data.books;
    catalogue = books.slice(0);
    catalogue.sort(function(a, b) {return a.title.toLowerCase().localeCompare(b.title.toLowerCase());})


    sorter = document.getElementById("casilla");
    printBooks();

  }).catch(function(error) {
    console.log("Something is missing" + error.message);

  })

}

//this function creates the search bar filter; it compares what's being typed in the input field with the titles of the books provided in the JSON file.
function search (){
  let input = document.getElementById("buscador");
  let query = input.value.toUpperCase();
  let volumes = document.getElementsByClassName('addedBook');
  let finding = "";

  for (i = 0; i < books.length; i++) {

      finding = books[i].title.textContent || books[i].title.innerText;

      if (books[i].title.toUpperCase().indexOf(query) > -1) {
        volumes[i].style.display = "";
      } else {
        volumes[i].style.display = "none";
      }

      if (volumes[i].title = null){document.getElementById("books-repository").innerHTML = "<p> Sorry! No results found. </p>";}

  }
}

// this function sorts the books alphabetically by title when the chekbox is cheked. Wether this is true or not, it prints the books in the screen.
function printBooks () {
  let booksStack = '';
  if (casilla.checked == true){
    booksStack = catalogue.slice(0);
  } else if (casilla.checked == false){
    booksStack = books.slice(0);
  }

  let press= "";

    for (let i = 0; i < booksStack.length; i++) {
      press += "<a class='addedBook' data-fancybox='images' href=" + booksStack[i].detail + "><div class='flip-card'><div class='flip-card-inner'><div class='flip-card-front'>" + "<img src=" + booksStack[i].cover +
      "/></div><div class='flip-card-back'><h1>" +
      booksStack[i].title + "</h1><p>" + booksStack[i].description + "</p><p> Language:" + " " + booksStack[i].language + "</p></div></div></div></a>";
  }

document.getElementById("books-repository").innerHTML = press;

}
