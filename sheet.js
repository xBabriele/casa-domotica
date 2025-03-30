"use strict"

// Variabili di stato
/*let temperatura = prompt("Inserire la temperatura iniziale della casa", 20);
let vattaggio = prompt("Inserire il vattaggio di consumo iniziale della casa (kw/h)", 2);
let vento = prompt("Inserire la velocità del vento fuori dalla casa (km/h)", 10);*/
let temperatura = 20;
let cambio_temp = true;
let consumo = 1.5;
let cambio_consumo = true;

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

// Prende la data e mette il tema secondo l'ora qualora si va ad aggiornare la pagina | mette il consumo e la temperatura iniziale della casa
let data;
let ora;    // hh:mm:ss
let ore;    // hh
let testo_temp = document.getElementById("temperatura").childNodes[1];  // span della temperatura
let testo_consumo = document.getElementById("electricity").childNodes[1];   // span del consumo elettrico

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

    testo_temp.innerHTML = temperatura + " °C";
    testo_consumo.innerHTML = consumo + " kW/h";
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


// Settaggio temperatura e consumo elettrico
setInterval(() => {
    if (cambio_temp) {
        testo_temp.innerHTML = temperatura + " °C";
    }
    if (cambio_consumo) {
        testo_consumo.innerHTML = consumo + " kW/h";
    }
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
        cambio_consumo = true;
        consumo -= 0.1;
    } else {    // Riattiva i bottoni che erano accesi
        for (let i=0; i < luci_accese.length; i++) {
            luci_accese[i].src = "img/lampadina.png";
        }
        cambio_consumo = true;
        consumo += 0.1;
    }
});


// Bottone del termosifone
let btn_termosifone = document.getElementById("check3").nextElementSibling;
let btn_condizionatore = document.getElementById("check6").nextElementSibling;
btn_termosifone.addEventListener("click", () => {
    if (!btn_termosifone.previousElementSibling.checked) {      // quando attivo il termosifone, disattivo il condizionatore in automatico
        btn_condizionatore.previousElementSibling.checked = false;
        cambio_temp=true;
        cambio_consumo = true;
        consumo += 0.4;
    } else {
        consumo -= 0.4;
    }
});
btn_condizionatore.addEventListener("click", () => {
    if (!btn_condizionatore.previousElementSibling.checked) {   // quando attivo il condizionatore, disattivo il termosifone in automatico
        btn_termosifone.previousElementSibling.checked = false;
        cambio_temp=true;
        cambio_consumo = true;
        consumo += 0.15;
    } else {
        consumo -= 0.15;
    }
});
setInterval(() => {
    if (btn_termosifone.previousElementSibling.checked) {       // Aumenta la temperatura di un grado ogni 8 secondi fino a 26 gradi
        temperatura++;
        if (temperatura >= 26) {
            btn_termosifone.previousElementSibling.checked = false;
            consumo -= 0.4;
        }
    }
    if (btn_condizionatore.previousElementSibling.checked) {    // Diminuisce la temperatura di un grado oghni 8 secondi fino ad arrivare a 14 gradi
        temperatura--;
        if (temperatura <= 14) {
            btn_condizionatore.previousElementSibling.checked = false;
            consumo -= 0.15;
        }
    }
}, 8000);





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
            if (x.checked) {
                switch (x.parentNode.id) {
                    case "lampadine":
                        consumo -= 0.1;
                        break;
                    case "riscaldamento":
                        consumo -= 0.4;
                        break;
                    case "condizionatore":
                        consumo -= 0.15;
                        break;
                    case "rumba":
                        consumo -= 0.1;
                        break;
                }
            }
            x.checked = false;
        }
    } else {    // Riattiva i bottoni che erano accesi
        for (let x of btn_accesi) {
            x.checked = true;
            switch (x.parentNode.id) {
                case "lampadine":
                    consumo += 0.1;
                    break;
                case "riscaldamento":
                    consumo += 0.4;
                    break;
                case "condizionatore":
                    consumo += 0.15;
                    break;
                case "rumba":
                    consumo += 0.1;
                    break;
            }
        }
    }
});