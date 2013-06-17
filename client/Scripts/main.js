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
}

localStorage.selectedId = "geen kaart geselecteerd";

function storeKaartId(kaart) {
    if(typeof(Storage) !== undefined) {
        localStorage.selectedId= $(kaart).attr("kaartId");
        console.log("selectedID: " + localStorage.selectedId);
    }
    else {
        console.log("Sorry, your browser does not support web storage...");
    }
}

function enkelCanvas() {
    var enkel = null;
    if (document.getElementById('enkel').checked) {
        enkel = true;
    }
    else if (document.getElementById('dubbel').checked) {
        enkel = false;
    }
    return enkel;
}

function templateKeus() {
    enkelCanvas();
    if (!document.getElementById('selectedTemplate')) {
        alert("kies eerst een template");
    }
    else {
        staandCanvas();
        staandOfLiggendCanvas();
    }
}

function staandOfLiggendCanvas() {
    if (staandCanvas() && !enkelCanvas()) {
        $('#kaartMaken > a').attr({href:"#/editorStaand"});
    }
    else if (staandCanvas() && enkelCanvas()) {
        $('#kaartMaken > a').attr({href:"#/editorStaandEnkel"});
    }
    else if (!staandCanvas() && !enkelCanvas()) {
        $('#kaartMaken > a').attr({href:"#/editor"});
    }
    else if (!staandCanvas() && enkelCanvas()) {
        $('#kaartMaken > a').attr({href:"#/editorEnkel"});
    }
}

function staandCanvas() {
    var selected = document.getElementById('selectedTemplate');
    var staand = null;
    if (selected.className === "templateliggend template") {
        staand = false;
    }
    else if (selected.className === "templatestaand template") {
        staand = true;
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
        "src":data.template,
        "class": "template" + positie + " template",
        "kaartId":data._id.$oid
    });
    $('#template' + positie + 'Div').append(image);
    $(image).hover(function() {$(this).css('cursor','pointer');}); //handje
}

