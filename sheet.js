/* Parametri della casa */
let consumo;
let temperatura;
let meteo;
let vento;

// Dichiaro i bottoni
let btn_spegni = document.getElementById("check1");
let btn_termosifone = document.getElementById("check3");
let btn_condizionatore = document.getElementById("check6");
let btn_roomba = document.getElementById("check7");
let luci = document.querySelectorAll(".lamp");

let btn_porte = document.getElementById("check2");
let btn_irrigatori = document.getElementById("check4");
let btn_finestre = document.getElementById("check5");

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
        if (getCookie("Meteo") == null) {   // Guardo se è passato un giorno da quando si sono creati i cookie (ho usato quello del meteo perché gli altri si aggiornano e durano più di un giorno)
            divVars.removeAttribute("style");   // Se in memoria non abbiamo i 4 cookie che ci servono, mostriamo il form per impostarli
        } else if (divVars != null) {   // Se non trova il div del form (perché si trova in una stanza, le quali non lo hanno) non fa nulla
            divVars.setAttribute("style", "display: none;");
        }
    });
}
if(form != null) {
    form.addEventListener("submit", (event) => {    // Quando schiaccia il bottone "Send" andrà ad impostare i cookies che dureranno per 1 giorno, dopo di chè si cancelleranno
        setCookie("Consumo", (inConsumo.value * 100), 1);
        setCookie("Temperatura", inTemp.value, 1);
        setCookie("Meteo", inMeteo.value, 1);
        setCookie("Vento", inVento.value, 1);

        consumo = parseInt(getCookie("Consumo"));
        temperatura = parseInt(getCookie("Temperatura"));
        meteo = getCookie("Meteo");
        vento = parseInt(getCookie("Vento"));
        
        divVars.setAttribute("style", "display: none;");

        let data = new Date();
        ore = data.getHours();
        if(ore >= 18 || ore < 6) {
            btn_finestre.checked = true;
            btn_porte.checked = true;
            setCookie("btn-finestre", "true", 1);
            setCookie("btn-porte", "true", 1);
        }
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
    
    if (ore >= 6 && ore < 18) {        // se l'ora in cui ha caricato il sito è dalle 6 alle 18 mette il tema chiaro
        change_theme.checked = true;
        body.setAttribute("class", "theme-light");
    } else {                            // sennò scuro e chiude finestre e porte
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
    consumo = parseInt(getCookie("Consumo"));
    temperatura = parseInt(getCookie("Temperatura"));
    meteo = getCookie("Meteo");
    vento = parseInt(getCookie("Vento"));

    // Li visualizzo
    testo_temp.innerHTML = temperatura + " °C";
    testo_consumo.innerHTML = consumo/100 + " kW/h";    // Il / 100 serve per non avere problemi con i decimali (in js se faccio 1.4 - 0.4 = 0.99999...) quindi lavoro con interi
    testo_vento.innerHTML = vento + " km/h"
    testo_meteo.innerHTML = meteo.charAt(0).toUpperCase() + meteo.slice(1);


    // Aggiorno i bottoni secondo i cookies
    getCookie("btn-luci") == null ? btn_spegni.checked = false : btn_spegni.checked = true;
    getCookie("btn-finestre") == null ? btn_finestre.checked = false : btn_finestre.checked = true;

    if (document.getElementById("spegni")) {
        getCookie("btn-termosifone") == null ? btn_termosifone.checked = false : btn_termosifone.checked = true;
        getCookie("btn-condizionatore") == null ? btn_condizionatore.checked = false : btn_condizionatore.checked = true;
        getCookie("btn-roomba") == null ? btn_roomba.checked = false : btn_roomba.checked = true;
        getCookie("btn-irrigatori") == null ? btn_irrigatori.checked = false : btn_irrigatori.checked = true;
        getCookie("btn-porte") == null ? btn_porte.checked = false : btn_porte.checked = true;
    }

    if (getCookie("btn-luci") == null) {    // Aggiorno le luci se il pulsante delle luci è spento (perché le luci di loro sono accese nel HTML)
        for (let i=0, j=0; i < luci.length; i++, j++) {
            luci[i].src = "img/lamp-spenta.png"
        }
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


// Funzioni per l'aggiornamento del consumo e temperatura della casa
function aggiorna_consumo() {
    testo_consumo.innerHTML = consumo/100 + " kW/h";
    setCookie("Consumo", consumo, 1);
}
function aggiorna_temperatura() {
    testo_temp.innerHTML = temperatura + " °C";
}


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
let luci_accese = new Array();
// Faccio una funzione e non direttamente l'event listener così poi posso richiamarla
function Luci() {
    if (btn_spegni.checked) {    // Se il bottone è attivo quando lo clicco (perciò voglio spegnere le luci (on -> off))
        for (let i=0, j=0; i < luci.length; i++, j++) {    // Cicla tra le luci, mette nell'array e spegne quelle accese
            luci[i].src = "img/lamp-spenta.png"
        }
        if (luci.length == 13)   // Se le luci spente sono 13 (tutte le luci) allora diminuisce il consumo energetico
            consumo -= 10;
        deleteCookie("btn-luci");   // Quando spengo le luci (o qualsiasi altro bottone) rimuovo lo stato del bottone dai cookie
    } else {    // Riattiva le luci che erano accesi
        for (let i=0; i < luci.length; i++) {
            luci[i].src = "img/lampadina.png";
        }
        if (luci.length == 13)
            consumo += 10;
        setCookie("btn-luci", "true", 1);   // Salvo in un cookie lo stato del bottone
    }
    aggiorna_consumo();
}
btn_spegni.nextElementSibling.addEventListener("click", Luci);   // Metto l'event listener sul bottone


// Bottone del termosifone e condizionatore
if(document.getElementById("check3") != null) {  // Se non trova nella pagina il bottone del termosifone (quindi si trova nelle stanze singole) non da errore
    btn_termosifone.nextElementSibling.addEventListener("click", () => {
        if (!btn_termosifone.checked) {      // quando attivo il termosifone, disattivo il condizionatore in automatico (se acceso)
            if (btn_condizionatore.checked) {
                btn_condizionatore.checked = false;
                consumo -= 15;  // Diminuisco il consumo relativo al condizionatore (0.15 kW/h)
                deleteCookie("btn-condizionatore");
            }
            consumo += 40;
            setCookie("btn-termosifone", "true", 1);
        } else {
            consumo -= 40;
            deleteCookie("btn-termosifone");
        }
        aggiorna_consumo();
    });
    btn_condizionatore.nextElementSibling.addEventListener("click", () => {
        if (!btn_condizionatore.checked) {   // quando attivo il condizionatore, disattivo il termosifone in automatico
            if (btn_termosifone.checked) {
                btn_termosifone.checked = false;
                consumo -= 40;
                deleteCookie("btn-termosifone");
            }
            cambio_temp=true;
            cambio_consumo = true;
            consumo += 15;
            setCookie("btn-condizionatore", "true", 1);
        } else {
            consumo -= 15;
            deleteCookie("btn-condizionatore");
        }
        aggiorna_consumo();
    });
    setInterval(() => {
        if (btn_termosifone.checked) {       // Aumenta la temperatura di un grado ogni 8 secondi fino a 26 gradi
            if (temperatura >= 26) {
                btn_termosifone.checked = false;
                consumo -= 40;
                deleteCookie("btn-termosifone");
            } else {
                temperatura++;
            }
        } else if (btn_condizionatore.checked) {    // Diminuisce la temperatura di un grado ogni 8 secondi fino ad arrivare a 14 gradi
            if (temperatura <= 14) {
                btn_condizionatore.checked = false;
                consumo -= 15;
                deleteCookie("btn-condizionatore");
            } else {
                temperatura--;
            }
        }
        aggiorna_temperatura();
        aggiorna_consumo();
        setCookie("Temperatura", temperatura, 1);
    }, 8000);
}


// Bottone del Roomba (aspirapolvere automatico)
if (document.getElementById("check7") != null) {
    btn_roomba.nextElementSibling.addEventListener("click", () => {
        if (!btn_roomba.checked) {
            consumo += 10;
            setCookie("btn-roomba", "true", 1);
        } else {
            consumo -= 10;
            deleteCookie("btn-roomba");
        }
        aggiorna_consumo();
    });
}
// Pulsanti per: irrigatori, porte, tapparelle/finestre (non influenzano il consumo della casa)
// Pulsante per le porte
if (document.getElementById("check2") != null) {
    btn_porte.nextElementSibling.addEventListener("click", () => {
        if (!btn_porte.checked) {
            setCookie("btn-porte", "true", 1);
        } else {
            deleteCookie("btn-porte");
        }
    });
}
// irrigatori
if (document.getElementById("check4") != null) {
    btn_irrigatori.nextElementSibling.addEventListener("click", () => {
        if (!btn_irrigatori.checked) {
            setCookie("btn-irrigatori", "true", 1);
        } else {
            deleteCookie("btn-irrigatori");
        }
    });
}
// finestre
if (document.getElementById("check5") != null) {
    btn_finestre.nextElementSibling.addEventListener("click", () => {
        if (!btn_finestre.checked) {
            setCookie("btn-finestre", "true", 1);
        } else {
            deleteCookie("btn-finestre");
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
                            Luci();
                            break;
                        case "riscaldamento":
                            consumo -= 40;
                            deleteCookie("btn-termosifone");
                            break;
                        case "condizionatore":
                            consumo -= 15;
                            deleteCookie("btn-condizionatore");
                            break;
                        case "roomba":
                            consumo -= 10;
                            deleteCookie("btn-roomba");
                            break;
                        case "irrigazione":
                            deleteCookie("btn-irrigatori");
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
                            Luci();
                            x.checked = true;
                            break;
                        case "riscaldamento":
                            if (!document.getElementById("check6").checked) {
                                x.checked = true;
                                consumo += 40;
                                setCookie("btn-termosifone", "true", 1);
                            }
                            break;
                        case "condizionatore":
                            if (!document.getElementById("check3").checked) {
                                x.checked = true;
                                consumo += 15;
                                setCookie("btn-condizionatore", "true", 1);
                            }
                            break;
                        case "roomba":
                            x.checked = true;
                            consumo += 10;
                            setCookie("btn-roomba", "true", 1);
                            break;
                        case "irrigazione":
                            x.checked = true;
                            setCookie("btn-irrigatori", "true", 1);
                            break;
                    }
                }
            }
        }
        aggiorna_consumo();
    });
}