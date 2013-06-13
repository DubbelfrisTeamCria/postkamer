/**
 * Selecteer een template
 */
function selecteerTemplate() {
    $('.template').click(function() {
        $('.template').removeAttr("id");
        $(this).attr('id', 'selectedTemplate');
        console.log("bla");
    });
};

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
    console.log("enkel = " + enkelCanvas());
    if (!document.getElementById('selectedTemplate')) {
        alert("kies eerst een template");
    }
    else {
        staandCanvas();
        console.log("staand = " + staandCanvas());
        staandOfLiggendCanvas();
    }
}

function staandOfLiggendCanvas() {
    if (staandCanvas()) {
        $('#kaartMaken > a').attr({href:"#/editorStaand",'data-ng-class':"{'active':getClass('/editorStaand')}"});
    }
    else if (!staandCanvas()) {
        $('#kaartMaken > a').attr({href:"#/editor",'data-ng-class':"{'active':getClass('/editor')}"});
    }
}

function staandCanvas() {
    var selected = document.getElementById('selectedTemplate');
    var staand = null;
    if (selected.className === "templateLiggend template") {
        staand = false;
    }
    else if (selected.className === "templateStaand template") {
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







