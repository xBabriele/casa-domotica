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


let data;
let ora;    // hh:mm:ss
let ore;    // hh
let evento = addEventListener("load", function() {
    data = new Date();

    ore = data.getHours();
/*
    if (ore >= 6 && ore < 18) {
        body.setAttribute("class", "morning");
    } else if (ore >= 18 && ore < 20) {
        body.setAttribute("class", "sunset");
    } else {
        body.setAttribute("class", "evening");
    }
*/
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