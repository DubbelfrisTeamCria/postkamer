/**
 * Selecteer een template
 */
function selecteerTemplate() {
    $('.template').click(function() {
        $('.template').removeAttr("id");
        $(this).attr('id', 'selectedTemplate');
        storeKaartId(this);
        templateKeus();
    });
    localStorage.enkel = true;
    enkelClick();
}

localStorage.selectedId = "geen kaart geselecteerd";
function storeKaartId(kaart) {
    if(typeof(Storage) !== undefined) {
        localStorage.selectedId = $(kaart).attr("kaartId");
        console.log("selectedID: " + localStorage.selectedId);
    }
    else {
        console.log("Sorry, your browser does not support web storage...");
    }
}

function enkelClick() {
    $('#enkel').click(function() {
        if (document.getElementById('enkel').checked) {
            localStorage.enkel = true;
        }
    });
    $('#dubbel').click(function() {
        if (document.getElementById('dubbel').checked) {
            localStorage.enkel = false;
        }
    });
    return localStorage.enkel;
}
function templateKeus() {
    if (!document.getElementById('selectedTemplate')) {
        alert("kies eerst een template");
    }
    else {
        enkelClick();
        staandCanvas();
        staandOfLiggendCanvas();
    }
}

function staandOfLiggendCanvas() {
    if (staandCanvas() && !enkelClick()) {
        $('#kaartMaken > a').attr({href:"#/editorStaand"});
    }
    else if (staandCanvas() && enkelClick()) {
        $('#kaartMaken > a').attr({href:"#/editorStaandEnkel"});
    }
    else if (!staandCanvas() && !enkelClick()) {
        $('#kaartMaken > a').attr({href:"#/editor"});
    }
    else if (!staandCanvas() && enkelClick()) {
        $('#kaartMaken > a').attr({href:"#/editorEnkel"});
    }
}

function staandCanvas() {
    var selected = document.getElementById('selectedTemplate');
    var staand = null;
    if (selected.className === "templateliggend template") {
        localStorage.positie = "liggend";
        staand = false;
    }
    else if (selected.className === "templatestaand template") {
        staand = true;
        localStorage.positie = "staand";
    }
    return staand;
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
        "class": "template" + positie + " template"
        , "kaartId":data._id.$oid
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