"use strict"

let body = document.getElementsByTagName("body")[0];

let temp = document.getElementById("temp");
let weather = document.getElementById("weather");
let vento = document.getElementById("vento");
let date = document.getElementById("date");
let porte = document.getElementById("porte");
let luci = document.getElementById("luci");
let posta = document.getElementById("posta");
let telecamere = document.getElementById("telecamere");

let change_theme = document.getElementById("checkbox1");
let label_check = document.getElementsByClassName("switch1")[0];
label_check.addEventListener("click", () => {
    if (change_theme.checked == true) {
        body.setAttribute("class", "theme-light");
    } else {
        body.setAttribute("class", "theme-dark");
    }
});

let data;
let ora;    // hh:mm:ss
let ore;    // hh
let load = addEventListener("load", function() {
    data = new Date();

    ore = data.getHours();

    if (ore >= 6 && ore <= 18) {
        change_theme.checked = true;
        body.setAttribute("class", "theme-light");
    } else {
        change_theme.checked = false;
        body.setAttribute("class", "theme-dark");
    }

    ora = new Intl.DateTimeFormat('it-IT', {      // l'ora nel div parameters
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false       // false per avere l'ora in formato 24
    }).format(data);

    date.innerHTML = ora;
});

// Aggiorna data ogni secondo
setInterval(function () {
    data = new Date();

    ora = new Intl.DateTimeFormat('it-IT', {      // l'ora nel div parameters
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false       // false per avere l'ora in formato 24
    }).format(data);

    date.innerHTML = ora;
}, 1000);


// Evento per nascondere lampadine all'interno della casa (per visualizzarla meglio)
let button = document.getElementById("setting");
let lampadine = document.getElementsByClassName("lamp");
button.addEventListener("click", () => {
    if (lampadine[0].style.display != "none") {
        button.src = "img/lamp-spenta.png";
        for (let x of lampadine) {
            x.style.display = "none";
        }
    } else {
        button.src = "img/lampadina.png";
        for (let x of lampadine) {
            x.removeAttribute("style");
        }
    }
});


// Evento del bottone di spegnimento
let spegni = document.querySelector(".switch");
let btn_spegnibili = document.querySelectorAll(".spegnibile");
let btn_accesi;
spegni.addEventListener("click", () => {
    // metti un array degli elementi spegnibili che hanno l'attr checked == true...
    if (spegni.previousElementSibling.checked == true) {
        for (let x of btn_spegnibili) {
            x.checked = false;
        }
    }
});