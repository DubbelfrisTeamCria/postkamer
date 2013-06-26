/*jslint browser: true, devel: true, nomen: true */
/*global $, jQuery*/

$('#FontsLoader').hide();

/**
 * Onclick functies voor het categorie menu en het algemene menu.
 * Wanneer er een categorie wordt gekozen,
 * wordt de categorie in de localStorage opgeslagen.
 */
function menuOnclick() {
    "use strict";
    $('#verhuizen').click(function() { localStorage.categorie = "verhuizen"; });
    $('#samenwonen').click(function() { localStorage.categorie = "samenwonen"; });
    $('#housewarming').click(function() { localStorage.categorie = "housewarming"; });
    $('#home').click(function() { selectLinesMenu("home"); });
    $('#overons').click(function() { selectLinesMenu("overons"); });
    $('#hoeWerktHet').click(function() { selectLinesMenu("hoeWerktHet"); });
    $('#contact').click(function() { selectLinesMenu("contact"); });
    $('#homeLogo').click(function() { selectLinesMenu("home"); });
}

/**
 * Slaat het id van de kaart op in de localStorage.
 * @param kaart de geselecteerde kaart.
 */
function storeKaartId(kaart) {
    "use strict";
    localStorage.selectedId = $(kaart).attr("kaartId");
}

/**
 * Slaat de positie op in de localStorage.
 * Positie is 'liggend' of 'staand'.
 * @param kaart de geselecteerde kaart.
 */
function storeKaartPositie(kaart) {
    "use strict";
    localStorage.positie = $(kaart).attr("positie");
}

/**
 * Zet de juiste url op de knop om naar de editor te gaan aan de hand van de gekozen opties.
 * Wanneer er een staande, dubbele kaart is gekozen moet er naar de staande, dubbele editor worden gelinkt.
 * Wanneer er een staande, enkele kaart is gekozen moet er naar de staande, enkele editor worden gelinkt.
 * Wanneer er een liggende, dubbele kaart is gekozen moet er naar de liggende, dubbele editor worden gelinkt.
 * Wanneer er een liggende, enkele kaart is gekozen moet er naar de liggende, enkele editor worden gelinkt.
 */
function staandOfLiggendCanvas() {
    "use strict";
    var kaartMakenLink = $('#kaartMakenLink');
    if (localStorage.positie === 'staand' && localStorage.enkel === "dubbel") {
        kaartMakenLink.attr({href: "#/editorStaand" });
    } else if (localStorage.positie === 'staand' && localStorage.enkel === "enkel") {
        kaartMakenLink.attr({href: "#/editorStaandEnkel" });
    } else if (localStorage.positie === 'liggend' && localStorage.enkel === "dubbel") {
        kaartMakenLink.attr({href: "#/editor" });
    } else if (localStorage.positie === 'liggend' && localStorage.enkel === "enkel") {
        kaartMakenLink.attr({href: "#/editorEnkel" });
    }
}

/**
 * Deze functie zet de juiste url op de knop om naar de editor te gaan,
 * wanneer er een kaart gekozen is.
 */
function templateKeus() {
    "use strict";
    if (!document.getElementById('selectedTemplate')) {
        alert("kies eerst een template");
    } else {
        staandOfLiggendCanvas();
    }
}

/**
 * Laat een lijn zien onder het geselecteerde menu item.
 * @param selected Het geselecteerde menu item.
 */
function selectLinesMenu(selected) {
    "use strict";
    $('.bottomlineBlock').hide();
    $('#' + selected + ' .bottomlineBlock').show();
}

/**
 * Zet de juiste attributen op de opgehaalde kaarten.
 *
 * @param data de kaart uit de database
 * @param positie de positie van de kaart (liggend/staand).
 */
function getTemplate(data, positie) {
    "use strict";
    var image = $('<img/>').attr({
        "src": data.templatePng,
        "class": "template" + positie + " template",
        "kaartId": data._id.$oid,
        "positie": positie
    });
    $('#template' + positie + 'Div').append(image);
    $(image).hover(function() { $(this).css('cursor', 'pointer'); }); //handje
}

$('.bottomlineBlock').hide();
selectLinesMenu("home");

/**
 * Haalt op of er een enkele of een dubbele kaart geselecteerd is.
 * Standaard staat het op enkel.
 */
function getEnkelOfDubbel() {
    "use strict";
    localStorage.enkel = $("input:checked").val();
    $("input").on("click", function() {
        localStorage.enkel = $("input:checked").val();
    });
}

/**
 * Selecteer een template functie.
 *
 * Wanneer er op een template geklikt wordt:
 * Wordt er een id 'selectedTemplate' op het geselecteerde template gezet.
 * Wordt het id welke bij de kaart hoort (zelfde als in de database) opgeslagen in de localStorage.
 * Wordt de kaart positie (liggend of staand) opgeslagen in de localStorage.
 * Wordt de juiste url toegevoegd aan de knop om naar de editor te gaan.
 *
 * Haalt op of er een enkele of een dubbele kaart geselecteerd is.
 */
function selecteerTemplate() {
    "use strict";
    $('.template').click(function() {
        $('.template').removeAttr("id");
        $(this).attr('id', 'selectedTemplate');
        storeKaartId(this);
        storeKaartPositie(this);
        templateKeus();
    });
    getEnkelOfDubbel();
}

/**
 * Deze functie zet een overlay in de body zolang hij laad.
 */
function addOverlay(){
    var overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
}
localStorage.email = 'null';
checkIfLoggedIn();
function checkIfLoggedIn(){
    if(localStorage.email == 'null'){
        localStorage.loggedIn = "loggedOut";
        console.log("logged out!");
        localStorage.email = 'null';
        $('#login').show();
        $('#logout').hide();
        $('#mijnpostkamer').hide();
    }
    else if(localStorage.email != 'null'){
        console.log("logged in!");
        localStorage.loggedIn = "loggedIn";
        $('#login').hide();
        $('#logout').show();
        $('#mijnpostkamer').show();
    }
}

//this.logouts = function(){
//    localStorage.email = null;
//    checkIfLoggedIn();
//};

