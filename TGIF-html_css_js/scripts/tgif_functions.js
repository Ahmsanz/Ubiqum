//main variables with witch the next functions work.

let data = "";

let camaraDatos = "";

let url1 = "https://api.propublica.org/congress/v1/113/senate/members.json"

let url2 = "https://api.propublica.org/congress/v1/113/house/members.json"

let statistics = "";

let cargador = document.getElementById("cargador");

// FUNCTION TO MAKE THE INFORMATION REQUEST

function getData() {

  if (window.location.href.includes("senate")) {
    objetivo = url1;
  } else if (window.location.href.includes("house")) {
    objetivo = url2;
  };

  fetch(objetivo, { //makes a request to get the info in a JSON file.
    method: "GET",
    headers: {
      "X-API-KEY": "hLqS03vX1DwAjiuaOn1dHIIuGnn4nnzNKRrDg9ph"
    }
  }).then(function(response) {
    if (response.ok) {
      return response.json();
    }

  }).then(function(json) {

    data = json; // defines de variable "data", containing all the info of the JSON file.

    camaraDatos = data.results[0].members; // access the "members" in the JSON file.

    statistics = { //object with the information of the different parties.
      democrats: {
        list_of_members: members("D"),
        number_of_members: members("D").length,
        votes: master("D", "votes_with_party_pct"),
        votes_average: media(master("D", "votes_with_party_pct")),
        votes_missed: master("D", "missed_votes"),
        votes_missed_average: media(master("D", "missed_votes"))
      },

      republicans: {
        list_of_members: members("R"),
        number_of_members: members("R").length,
        votes: master("D", "votes_with_party_pct"),
        votes_average: media(master("D", "votes_with_party_pct")),
        votes_missed: master("R", "missed_votes"),
        votes_missed_average: media(master("R", "missed_votes"))
      },

      independents: {
        list_of_members: members("I"),
        number_of_members: members("I").length,
        votes: master("I", "votes_with_party_pct"),
        votes_average: media(master("I", "votes_with_party_pct")),
        votes_missed: master("I", "missed_votes"),
        votes_missed_average: media(master("I", "missed_votes"))
      }
    }

    if (window.location.href.includes("tgif_senate.html") || window.location.href.includes("tgif_house.html")) {
      createStateFilter(); //calls the function that creates the states list in the dropdown filter.
      filterChamber(); // filters and prints the table with the conditions specified.

    } else if (window.location.href.includes("/senate_attendance") || window.location.href.includes("/house_attendance")) {
      atAGlance(); //prints the table "at a glance"
      attendance(); // prints the two "attendance" tables.

    } else if (window.location.href.includes("/senate_loyalty") || window.location.href.includes("/house_loyalty")) {
      atAGlance();
      loyalty(); // prints the two "loyalty" tables.
    };

    cargador.style = "display: none"



  }).catch(function(error) {
    console.log("Something went wrong" + error.message);


  })

}

getData(); // calls the full request function


function createStateFilter() { //creates the states list in the dropdown filter.

  let estados = [];

  for (let i = 0; i < camaraDatos.length; i++) {

    estados.push(camaraDatos[i].state) //sends the states to the empty array.
  }

  let estadosOrd = estados.sort(function(a, b) {
    return a.localeCompare(b);
  }); //sorts the states alphabetically.

  let result2 = "";
  for (let i = 0; i < estadosOrd.length; i++) {
    if (estadosOrd[i] !== estadosOrd[i + 1]) { // this condition will make that only the non-repeated states pass to the array.


      result2 += "<option value=" + estadosOrd[i] + ">" + estadosOrd[i] + "</option>";
    }

  }

  let result = "<option value=" + "null" + ">--</option>" + result2; //sends a single "option" plus the states list.
  document.getElementById("dropdownFilter").innerHTML = result;

}

function printCam(lista) { // prints the table on the page with the specified "list"

  let camara = "";

  for (let i = 0; i < lista.length; i++) {

    camara += "<tr><td>" + "<a href=" + lista[i].url + ">" + nombresCamara(lista)[i] + "</a>" + "</td><td>" +
      lista[i].party + "</td><td>" +
      lista[i].state + "</td><td>" +
      lista[i].seniority + " " + "years" + "</td><td>" +
      lista[i].votes_with_party_pct + "%" + "</td></tr>";

  }

  document.getElementById("chamber-data").innerHTML = camara;
}

function filterChamber() { //this function modifies the original table after the two specified filters act.


  // variables to identify the HTML chekboxes and test wether they are checked or not.

  let casillaR = document.getElementById("republican");
  let casillaD = document.getElementById("democrat");
  let casillaI = document.getElementById("independent");

  // variables equivalent to the "select" and the value it shows at a given moment.
  let selector = document.getElementById("dropdownFilter");
  let opcion = selector.options[selector.selectedIndex].text;

  let camaraEstado = camaraDatos.filter(camSta => camSta.state == opcion); // filters the original table depending on the state shown in the select.
  let camara = "";
  if (opcion !== "--") { //if the states select is empty...
    camara = camaraEstado} else {camara = camaraDatos;}

  //variables that filter the table after the party chosen in the checkboxes.
  let chamber;

  if (casillaD.checked == true || casillaR.checked == true || casillaI.checked == true) {
    chamber = [];

    let chamD;
    let chamR;
    let chamI;
    if (casillaD.checked == true) { chamD = camara.filter(cham => cham.party == casillaD.value); chamber = chamber.concat(chamD);};
    if (casillaR.checked == true) { chamR = camara.filter(cham => cham.party == casillaR.value); chamber = chamber.concat(chamR);};
    if (casillaI.checked == true) { chamI = camara.filter(cham => cham.party == casillaI.value); chamber = chamber.concat(chamI);};

  }else {chamber = camara};

  printCam(chamber);

}

//FUNCTIONS TO BUILD THE PARTIES OBJECT AND THE SMALL TABLES (ATTENDANCE AND LOYALY)

function nombresCamara(chamber) {
  let name = [];

  for (let i = 0; i < chamber.length; i++) {

    if (chamber[i].middle_name = "null") {
      result = chamber[i].first_name + " " + chamber[i].last_name;

    } else {
      result = chamber[i].first_name + " " + chamber[i].middle_name + " " + chamber[i].last_name;

    }
    name.push(result);

  }
  return name;
}


function media(a) { //function to get the average of the values in an array. It combines a fuction that adds the values in the array and then it divides the result by the number of elements.

  function suma(total, num) {
    return b = total + num;
  }
  let denominador = a.length;

  return (a.reduce(suma, 0) / denominador).toFixed(2);
}

function members(sigla) {
  let partyMembers;
  let camara = camaraDatos.filter(cham => cham.party == sigla);
  partyMembers = nombresCamara(camara);
  return partyMembers;
}

function master(sigla, detail) {
  let result = [];

  for (var i = 0; i < camaraDatos.length; i++) {
    if (camaraDatos[i].party == sigla)
      result.push(camaraDatos[i][detail]);
  }
  return result;

}

function atAGlance() {

  let glance = "<tr><td> Republicans </td><td>" + statistics.republicans.number_of_members + "</td><td>" + statistics.republicans.votes_average + "%" + "</td></tr>" +
    "<tr><td> Democrats </td><td>" + statistics.democrats.number_of_members + "</td><td>" + statistics.democrats.votes_average + "%" + "</td></tr>" +
    "<tr><td> Independents </td><td>" + statistics.independents.number_of_members + "</td><td>" + "N/A" + "</td></tr>";

  document.getElementById("glance-stats").innerHTML = glance;
}

function attendance() {
  let goodAttendees="";
  let badAttendees="";
  let list = camaraDatos.sort(function(a, b) {return a.missed_votes_pct - b.missed_votes_pct;});

  for (let i = list.length - 1; i > (list.length - (list.length / 10)); i--) {
    badAttendees += "<tr><td>" + "<a href=" + list[i].url + ">" + nombresCamara(list)[i] + "</a>" + "</td><td>" + list[i].missed_votes + "</td><td>" + list[i].missed_votes_pct + "%" + "</td></tr>";
  }
  document.getElementById("least-stats").innerHTML = badAttendees;
  for (let i = 0; i < (list.length / 10); i++) {
    goodAttendees += "<tr><td>" + "<a href=" + list[i].url + ">" + nombresCamara(list)[i] + "</a>" + "</td><td>" + list[i].missed_votes + "</td><td>" + list[i].missed_votes_pct + "%" + "</td></tr>";
  }
  document.getElementById("most-stats").innerHTML = goodAttendees;
}

function loyalty() {
  let mostLoyal = "";
  let leastLoyal = "";
  let list = camaraDatos.sort(function(a, b) {return b.votes_with_party_pct - a.votes_with_party_pct;});

  for (let i = 0; i < list.length / 10; i++) {
    mostLoyal += "<tr><td>" + "<a href=" + list[i].url + ">" + nombresCamara(list)[i] + "</a>" + "</td><td>" + ((list[i].total_votes * list[i].votes_with_party_pct) / 100).toFixed(0) + "</td><td>" + list[i].votes_with_party_pct + "%" + "</td></tr>";
  }
  document.getElementById("loyal-stats").innerHTML = mostLoyal;
  for (let i = list.length - 1; i > list.length - (list.length / 10); i--) {
    leastLoyal += "<tr><td>" + "<a href=" + list[i].url + ">" + nombresCamara(list)[i] + "</a>" + "</td><td>" + ((list[i].total_votes * list[i].votes_with_party_pct) / 100).toFixed(0) + "</td><td>" + list[i].votes_with_party_pct + "%" + "</td></tr>";
  }
  document.getElementById("traitor-stats").innerHTML = leastLoyal;
}


let mybutton = document.getElementById("mybutton");
let mysignature = document.getElementById("firma");

// FUNCTION THAT MAKES THE "BACK TO THE TOP" APPEAR ONLY WHEN SCROLLING A CERTAIN DISTANCE.
if (window.location.href.includes("house")) {
  window.onscroll = function() {
  scrollFunction()
};}

function scrollFunction() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    mybutton.style.display = "block";
    mysignature.style.display = "flex";

  } else {
    mybutton.style.display = "none";
    mysignature.style.display = "none";
  }
}

//FUNCTION THAT CREATES THE BUTTON "BACK TO THE TOP"

function topper() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0;
}
