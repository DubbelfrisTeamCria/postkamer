/*jslint browser: true*/
/*global $, jQuery*/

/**
 * Haalt op of er een enkele of een dubbele kaart geselecteerd is.
 * Standaard staat het op enkel.
 */
function  getEnkelOfDubbel(){
    "use strict";
    localStorage.enkel = $("input:checked").val();
    $("input").on("click", function() {
        localStorage.enkel = $("input:checked").val();
    });
}

function storeKaartId(kaart) {
    if(typeof(Storage) !== undefined) {
        localStorage.selectedId = $(kaart).attr("kaartId");
        console.log("selectedID: " + localStorage.selectedId);
    }
    else {
        console.log("Sorry, your browser does not support web storage...");
    }
}

function storeKaartPositie(kaart) {
    if(typeof(Storage) !== undefined) {
        localStorage.positie = $(kaart).attr("positie");
        console.log("positie: " + localStorage.positie);
    }
    else {
        console.log("Sorry, your browser does not support web storage...");
    }
}

function templateKeus() {
    if (!document.getElementById('selectedTemplate')) {
        alert("kies eerst een template");
    }
    else {
        staandOfLiggendCanvas();
    }
}

function staandOfLiggendCanvas() {
    var kaartMakenLink = $('#kaartMakenLink');
    if (localStorage.positie == 'staand' && localStorage.enkel == "dubbel") {

        kaartMakenLink.attr({href:"#/editorStaand"});
    }
    else if (localStorage.positie =='staand' && localStorage.enkel == "enkel") {  //??????????????
        kaartMakenLink.attr({href:"#/editorStaandEnkel"});
    }
    else if (localStorage.positie == 'liggend' && localStorage.enkel =="dubbel") {
        kaartMakenLink.attr({href:"#/editor"});
    }
    else if (localStorage.positie =='liggend' && localStorage.enkel =="enkel") {
        kaartMakenLink.attr({href:"#/editorEnkel"});
    }
    console.log("enkel: " + localStorage.enkel);
}

$('.bottomlineBlock').hide();
selectLinesMenu("home");

/**
 * Laat een lijn zien onder het geselecteerde menu item.
 * @param selected Het geselecteerde menu item.
 */
function selectLinesMenu(selected) {
    $('.bottomlineBlock').hide();
    $('#' + selected + ' .bottomlineBlock').show();
}

//Zet de onclick op de menu items voor de lijn eronder.
$('#home').click(function() {selectLinesMenu("home");});
$('#overons').click(function() {selectLinesMenu("overons");});
$('#hoeWerktHet').click(function() {selectLinesMenu("hoeWerktHet");});
$('#contact').click(function() {selectLinesMenu("contact");});
$('#homeLogo').click(function() {selectLinesMenu("home");});

function getTemplate(data, positie) {
    var image = $('<img/>').attr({
        "src":data.templatePng,
        "class": "template" + positie + " template",
        "kaartId":data._id.$oid,
        "positie":positie
    });
//    image.data({
//        "kaartId":data._id.$oid});
    $('#template' + positie + 'Div').append(image);
    $(image).hover(function() {$(this).css('cursor','pointer');}); //handje
}

function categorie() {
    $('#verhuizen').click(function() {localStorage.categorie = "verhuizen"; console.log("gekozen categorie: " + localStorage.categorie);});
    $('#samenwonen').click(function() {localStorage.categorie = "samenwonen"; console.log("gekozen categorie: " + localStorage.categorie);});
    $('#housewarming').click(function() {localStorage.categorie = "housewarming"; console.log("gekozen categorie: " + localStorage.categorie);});
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