"use strict"

/* Parametri della casa */
let consumo;
let temperatura;
let meteo;
let vento;

let cambio_consumo = true;  // Usati per avviare gli interal (sempre uguali a true)
let cambio_temp = true;


// Cookies
let divVars = document.getElementById("setVars");   // Div per impostare i parametri
// Input del form
let inConsumo = document.getElementById("in1");
let inTemp = document.getElementById("in2");
let inVento = document.getElementById("in3");
let inMeteo = document.getElementById("in-meteo");

let form = document.getElementById("form"); // Form per il submit dei parametri

const cookieArray = document.cookie.split("; ");    // Faccio un'array dei cookie esistenti
if (divVars != null) {
    addEventListener("load", () => {
        if (cookieArray.length != 4) {
            divVars.removeAttribute("style");   // Se in memoria non abbiamo i 4 cookie che ci servono, mostriamo il form per impostarli
        } else if (divVars != null) {   // Se non trova il div del form (perché si trova in una stanza, le quali non lo hanno) non fa nulla
            divVars.setAttribute("style", "display: none;");
        }
    });
}
if(form != null) {
    form.addEventListener("submit", (event) => {    // Quando schiaccia il bottone "Send" andrà ad impostare i cookies che dureranno per 1 giorno, dopo di chè si cancelleranno
        setCookie("Consumo", inConsumo.value, 1);
        setCookie("Temperatura", inTemp.value, 1);
        setCookie("Meteo", inMeteo.value, 1);
        setCookie("Vento", inVento.value, 1);

        consumo = parseInt(getCookie("Consumo")) * 100;     // Il * 100 serve per non avere problemi con i decimali (in js se faccio 1.4 - 0.4 = 0.99999...) quindi lavoro con interi
        temperatura = parseInt(getCookie("Temperatura"));
        meteo = getCookie("Meteo");
        vento = parseInt(getCookie("Vento"));
        
        divVars.setAttribute("style", "display: none;");
    });
}
// Per creare cookie non manualmente
function setCookie(name, value, days) { // days that the cookie will live
    const date = new Date();
    date.setTime(date.getTime() + days * 1000 * 60 * 60 * 24);  // date.getTime() -> data in millisecondi, days dovrà quindi essere moltiplicato per farlo diventare giorni in ms (un giorno = 86400000 ms)
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=../`;
}
function getCookie(name) {
    const cookieArray = document.cookie.split("; ");

    let result = null;
    cookieArray.forEach(element => {
        if(element.indexOf(name) == 0) {
            result = element.substring(name.length + 1);
        }
    });
    return result;
}

// Per eliminare un cookie specifico
function deleteCookie(name) {
    setCookie(name, null, null)
}
function deleteAllCookies() {
    cookieArray.forEach(element => {
        let nome = element.substring(0, element.indexOf('='));
        setCookie(nome, null, null);
    });
}
// Fine parte Cookies


let body = document.getElementsByTagName("body")[0];

// Evento per il cambio di tema del sito (dal bottone in alto a sinistra)
let change_theme = document.getElementById("checkbox1");
let label_check = document.getElementsByClassName("switch1")[0];
label_check.addEventListener("click", () => {
    if (change_theme.checked == true) {
        body.setAttribute("class", "theme-light");
    } else {
        body.setAttribute("class", "theme-dark");
    }
});



// Prende la data e mette il tema secondo l'ora, ogni volta che si va ad aggiornare la pagina. Inoltre mette il consumo e la temperatura iniziale della casa
let data;
let ora;    // hh:mm:ss
let ore;    // hh
let testo_temp = document.getElementById("temperatura").childNodes[1];      // span della temperatura (dove visualizzo la temperatura nel sito)
let testo_consumo = document.getElementById("electricity").childNodes[1];   // span del consumo elettrico
let testo_vento = document.getElementById("vento");                         // span della velocità del vento
let testo_meteo = document.getElementById("meteo");                         // span del meteo



// Quando si carica il sito
addEventListener("load", function() {
    data = new Date();

    ore = data.getHours();
    
    if (ore >= 6 && ore <= 18) {        // se l'ora in cui ha caricato il sito è dalle 6 alle 18 mette il tema chiaro
        change_theme.checked = true;
        body.setAttribute("class", "theme-light");
    } else {                            // sennò scuro
        change_theme.checked = false;
        body.setAttribute("class", "theme-dark");
    }

    ora = new Intl.DateTimeFormat('it-IT', {      // l'ora nel div parameters in formato: hh:mm:ss
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false       // false per avere l'ora in formato 24
    }).format(data);

    date.innerHTML = ora;

    // Inizializzo i parametri
    consumo = parseInt(getCookie("Consumo")) * 100;
    temperatura = parseInt(getCookie("Temperatura"));
    meteo = getCookie("Meteo");
    vento = parseInt(getCookie("Vento"));

    // Li visualizzo
    testo_temp.innerHTML = temperatura + " °C";
    testo_consumo.innerHTML = consumo/100 + " kW/h";
    testo_vento.innerHTML = vento + " km/h"
    testo_meteo.innerHTML = meteo.charAt(0).toUpperCase() + meteo.slice(1);
});
// Quando andiamo via dal sito -> aggiorna i cookies e salvo lo stato dei bottoni
addEventListener("visibilitychange", (e) => {
    if (meteo != null) {
        setCookie("Consumo", (consumo/100), 1);
        setCookie("Temperatura", temperatura, 1);
        setCookie("Meteo", meteo, 1);
        setCookie("Vento", vento, 1);
    }
});

// Aggiorna la data ogni secondo
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

// Aggiorno la temperatura e il consumo elettrico ogni mezzo secondo
setInterval(() => {
    if (cambio_temp) {
        testo_temp.innerHTML = temperatura + " °C";
    }
    if (cambio_consumo) {
        testo_consumo.innerHTML = consumo/100 + " kW/h";
    }
}, 500);



// Evento per nascondere lampadine all'interno della casa (per visualizzarla meglio)
let btn_settings = document.getElementById("setting");
let lampadine = document.getElementsByClassName("lamp");
btn_settings.addEventListener("click", () => {
    if (lampadine[0].style.display != "none") {
        btn_settings.src = "img/lamp-spenta.png";
        for (let x of lampadine) {
            x.style.display = "none";
        }
    } else {
        btn_settings.src = "img/lampadina.png";
        for (let x of lampadine) {
            x.removeAttribute("style");
        }
    }
});
// Evento del bottone di spegnimento luci
let btn_spegni = document.getElementById("check1").nextElementSibling;
let luci = document.querySelectorAll(".lamp");
let luci_accese = new Array();
// Faccio una funzione e non direttamente l'event listener così poi posso richiamarla
function spegniLuci() {
    if (btn_spegni.previousElementSibling.checked) {    // Se il bottone è attivo quando lo clicco (perciò voglio spegnere le luci (on -> off))
        luci_accese = [];    // Ogni volta che voglio spegnere tutte le luci mi resetta l'array delle luci accese

        for (let i=0, j=0; i < luci.length; i++, j++) {    // Cicla tra le luci, mette nell'array e spegne quelle accese
            if (luci[i].getAttribute("src") == "img/lampadina.png") {
                luci_accese[j] = luci[i];
                luci[i].src = "img/lamp-spenta.png"
            }
        }
        if (luci_accese.length == 13)   // Se le luci spente sono 13 (tutte le luci) allora diminuisce il consumo energetico
            consumo -= 10;
    } else {    // Riattiva le luci che erano accesi
        for (let i=0; i < luci_accese.length; i++) {
            luci_accese[i].src = "img/lampadina.png";
        }
        if (luci_accese.length == 13)
            consumo += 10;
    }
}
btn_spegni.addEventListener("click", spegniLuci);   // Metto l'event listener sul bottone


// Bottone del termosifone
if(document.getElementById("check3") != null) {  // Se non trova nella pagina il bottone del termosifone (quindi si trova nelle stanze singole) non da errore
    let btn_termosifone = document.getElementById("check3").nextElementSibling;
    let btn_condizionatore = document.getElementById("check6").nextElementSibling;
    btn_termosifone.addEventListener("click", () => {
        if (!btn_termosifone.previousElementSibling.checked) {      // quando attivo il termosifone, disattivo il condizionatore in automatico (se acceso)
            if (btn_condizionatore.previousElementSibling.checked) {
                btn_condizionatore.previousElementSibling.checked = false;
                consumo -= 15;  // Diminuisco il consumo relativo al condizionatore (0.15 kW/h)
            }
            consumo += 40;
        } else {
            consumo -= 40;
        }
    });
    btn_condizionatore.addEventListener("click", () => {
        if (!btn_condizionatore.previousElementSibling.checked) {   // quando attivo il condizionatore, disattivo il termosifone in automatico
            if (btn_termosifone.previousElementSibling.checked) {
                btn_termosifone.previousElementSibling.checked = false;
                consumo -= 40;
            }
            cambio_temp=true;
            cambio_consumo = true;
            consumo += 15;
        } else {
            consumo -= 15;
        }
    });
    setInterval(() => {
        if (btn_termosifone.previousElementSibling.checked) {       // Aumenta la temperatura di un grado ogni 8 secondi fino a 26 gradi
            if (temperatura >= 26) {
                btn_termosifone.previousElementSibling.checked = false;
                consumo -= 40;
            } else {
                temperatura++;
            }
        } else if (btn_condizionatore.previousElementSibling.checked) {    // Diminuisce la temperatura di un grado ogni 8 secondi fino ad arrivare a 14 gradi
            if (temperatura <= 14) {
                btn_condizionatore.previousElementSibling.checked = false;
                consumo -= 15;
            } else {
                temperatura--;
            }
        }
    }, 8000);
}

// Bottone del Roomba (aspirapolvere automatico)
if (document.getElementById("check7") != null) {
    let btn_roomba = document.getElementById("check7").nextElementSibling;
    btn_roomba.addEventListener("click", () => {
        if (!btn_roomba.previousElementSibling.checked) {
            consumo += 10;
        } else {
            consumo -= 10;
        }
    });
}


// Evento del bottone di spegnimento completo
let spegni = document.querySelector(".switch");
let btn_spegnibili = document.querySelectorAll(".spegnibile");  // Metto all'interno dell'array tutti queli che vanno ad influenzare il consumo energetico della casa (nel HTML avranno la classe .spegnibile)
let btn_accesi = new Array();   // Bottoni accesi prima di spegnerli tutti (così quando riaccendo (riclicco) i bottoni che erano accesi all'inizio saranno di nuovo accesi e quelli spenti rimarranno spenti)
if (spegni != null) {
    spegni.addEventListener("click", () => {
        if (spegni.previousElementSibling.checked) {    // Se quando clicchiamo il bottone è acceso (e quindi vogliamo spegnere tutto)
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
                            spegniLuci();
                            break;
                        case "riscaldamento":
                            consumo -= 40;
                            break;
                        case "condizionatore":
                            consumo -= 15;
                            break;
                        case "roomba":
                            consumo -= 10;
                            break;
                    }
                }
                x.checked = false;
            }
        } else {    // Riattiva i bottoni che erano accesi
            for (let x of btn_accesi) {
                if (!x.checked) {       // Se il bottone messo all'interno dell'array non si è riacceso prima di cliccare questo bottone un'altra volta
                    switch (x.parentNode.id) {
                        case "lampadine":
                            spegniLuci();
                            x.checked = true;
                            break;
                        case "riscaldamento":
                            if (!document.getElementById("check6").checked) {
                                x.checked = true;
                                consumo += 40;
                            }
                            break;
                        case "condizionatore":
                            if (!document.getElementById("check3").checked) {
                                x.checked = true;
                                consumo += 15;
                            }
                            break;
                        case "roomba":
                            x.checked = true;
                            consumo += 10;
                            break;
                        case "irrigazione":
                            x.checked = true;
                            break;
                    }
                }
            }
        }
    });
}
