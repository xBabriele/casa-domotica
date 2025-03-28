"use strict"

// Variabili di stato
/*let temperatura = prompt("Inserire la temperatura iniziale della casa", 20);
let vattaggio = prompt("Inserire il vattaggio di consumo iniziale della casa (kw/h)", 2);
let vento = prompt("Inserire la velocità del vento fuori dalla casa (km/h)", 10);*/
let cambio_temp = true;

let body = document.getElementsByTagName("body")[0];

// Evento per il cambio di tema del sito
let change_theme = document.getElementById("checkbox1");
let label_check = document.getElementsByClassName("switch1")[0];
label_check.addEventListener("click", () => {
    if (change_theme.checked == true) {
        body.setAttribute("class", "theme-light");
    } else {
        body.setAttribute("class", "theme-dark");
    }
});

// Prende la data e mette il tema secondo l'ora qualora si va ad aggiornare la pagina
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


let testo_temp = document.getElementById("temperatura").childNodes[1];  // span della temperatura
// Settaggio temperatura
setInterval(() => {
    if (cambio_temp) {
        testo_temp.innerHTML = temperatura + " °C";
    }
}, 5000);


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

// Evento del bottone di spegnimento luci
let btn_spegni = document.getElementById("check1").nextElementSibling;
let luci = document.querySelectorAll(".lamp");
let luci_accese = new Array();
btn_spegni.addEventListener("click", () => {
    if (btn_spegni.previousElementSibling.checked) {
        luci_accese = [];    // Ogni volta che voglio spegnere tutte le luci mi resetta l'array delle luci accese

        for (let i=0, j=0; i < luci.length; i++, j++) {    // Cicla tra le luci e mette nell'array quelle accese
            if (luci[i].getAttribute("src") == "img/lampadina.png") {
                luci_accese[j] = luci[i];
            }
        }
        for (let x of luci) {     // spegne i bottoni
            x.src = "img/lamp-spenta.png";
        }
    } else {    // Riattiva i bottoni che erano accesi
        for (let i=0; i < luci_accese.length; i++) {
            luci_accese[i].src = "img/lampadina.png";
        }
    }
});


// Bottone del termosifone
let btn_termosifone = document.getElementById("check3").nextElementSibling;
let btn_condizionatore = document.getElementById("check6").nextElementSibling;
btn_termosifone.addEventListener("click", () => {
    if (!btn_termosifone.previousElementSibling.checked) {
        btn_condizionatore.previousElementSibling.checked = false;
        setInterval(() => {
            temperatura++;
            testo_temp = temperatura + " °C";
        }, 15000)
    }
});



// Evento del bottone di spegnimento completo
let spegni = document.querySelector(".switch");
let btn_spegnibili = document.querySelectorAll(".spegnibile");
let btn_accesi = new Array();   // Bottoni accesi prima di spegnerli tutti (così quando riaccendo (riclicco) i bottoni che erano accesi all'inizio saranno di nuovo accesi e quelli spenti rimarranno spenti)
spegni.addEventListener("click", () => {
    if (spegni.previousElementSibling.checked) {
        btn_accesi = [];    // Ogni volta che voglio spegnere tutto mi resetta l'array
        for (let i=0, j=0; i < btn_spegnibili.length; i++) {    // Cicla tra gli elementi spegnibili e mette quelli accesi
            if (btn_spegnibili[i].checked) {
                btn_accesi[j++] = btn_spegnibili[i];
            }
        }
        for (let x of btn_spegnibili) {     // spegne i bottoni
            x.checked = false;
        }
    } else {    // Riattiva i bottoni che erano accesi
        for (let i=0; i < btn_accesi.length; i++) {
            btn_accesi[i].checked = true;
        }
    }
});