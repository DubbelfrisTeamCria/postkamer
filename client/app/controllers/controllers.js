/*global app, editor, getJSON, getJSONTemplate, getTemplate, selecteerTemplate, loadTemplatePubliek, templateGekozen, loadTemplate, menuOnclick */
/*jslint browser: true, devel: true, nomen: true, nomen: true, plusplus: true  */

var templatesUrl = "https://api.mongolab.com/api/1/databases/postkamer/collections/templates?apiKey=9uG9lRHWlBDQeeLLotE_5FDaxUVUuGQC",
    klantenUrl = "https://api.mongolab.com/api/1/databases/postkamer/collections/klanten?apiKey=9uG9lRHWlBDQeeLLotE_5FDaxUVUuGQC";

/**
 * De controller van de editor partial.
 */
app.controller('EditorCtrl', function (service, $scope, $location) {
    "use strict";

    localStorage.opgeslagen = "gewijzigd";

    /**
     * Wanneer de gebruiker de editor wil verlaten en de kaart is niet opgeslagen,
     * wordt er een alert getoond om om bevestiging te vragen.
     */
    $scope.$on('$locationChangeStart', function (event, next) {
        if (localStorage.opgeslagen === "gewijzigd") {
            if (!confirm("Je ontwerp is nog niet opgeslagen. Weet je zeker dat je nu naar " + next + " wil gaan?")) {
                event.preventDefault();
            }
        }
    });

    /**
     * Zet de positie en enkel/dubbel bij de bijbehorende editor.
     * Deze functie zorgt ervoor dat de juiste informatie gebruikt wordt,
     * wanneer er direct naar de editor gelinkt wordt. (zonder een template gekozen te hebben.)
     */
    function setData() {
        if ($location.path() === "/editor") {
            localStorage.positie = "liggend";
            localStorage.enkel = "dubbel";

        } else if ($location.path() === "/editorEnkel") {
            localStorage.positie = "liggend";
            localStorage.enkel = "enkel";

        } else if ($location.path() === "/editorStaand") {
            localStorage.positie = "staand";
            localStorage.enkel = "dubbel";

        } else if ($location.path() === "/editorStaandEnkel") {
            localStorage.positie = "staand";
            localStorage.enkel = "enkel";
        }
    }

    setData();
    editor();

    /**
     * Slaat de kaart van de gebruiker op. (privé kaart.)
     * De kaart wordt in een JSON formaat opgeslagen met de functie getJSON() (in de editor.js).
     * De boolean 'opgeslagen' wordt op true gezet, zodat de gebruiker de editor kan verlaten zonder waarschuwing.
     * Daarna wordt de kaart opgeslagen in de database door de service (zie service.js)
     */
    $scope.save = function () {
        var data = getJSON();
        localStorage.opgeslagen = "opgeslagen";
        alert("Het ontwerp is opgeslagen.");
        service.saveTemplate(templatesUrl, data);
    };

    /**
     * Slaat de kaart van de gebruiker op. (publieke kaart/ template.)
     * De kaart wordt in een JSON formaat opgeslagen met de functie getJSONTemplate() (in de editor.js).
     * De boolean 'opgeslagen' wordt op true gezet, zodat de gebruiker de editor kan verlaten zonder waarschuwing.
     * Daarna wordt de kaart opgeslagen in de database door de service (zie service.js)
     *
     */
    $scope.savePubliek = function () {
        var data = getJSONTemplate();
        localStorage.opgeslagen = "opgeslagen";
        alert("De publieke template is opgeslagen.");
        service.saveTemplate(templatesUrl, data);
    };

    /**
     * Wanneer de partial geladen is worden eerst alle kaarten uit de database opgehaald.
     * Dit doen we, omdat we alleen de client kant hebben gebouwd en dus niet direct in de databse kunnen zoeken.
     * Wanneer een kaart hetzelfde id heeft als het id in de localStorage,
     * wordt de kaart meegegeven aan loadTemplatePubliek() en templateGekozen() (zie editor.js).
     */
    service.async(templatesUrl).then(function (data) {
        var kaart;
        for (kaart = 0; kaart < data.length; kaart++) {
            if (data[kaart]._id.$oid === localStorage.selectedId) {
                loadTemplatePubliek(data[kaart]);
                templateGekozen(data[kaart]);
            }
        }
        document.body.style.cursor = 'default';
    });

    /**
     * Wanneer de partial geladen is worden eerst alle kaarten uit de database opgehaald.
     * Dit doen we, omdat we alleen de client kant hebben gebouwd en dus niet direct in de databse kunnen zoeken.
     * Wanneer een kaart hetzelfde id heeft als het id in de localStorage,
     * wordt de kaart meegegeven aan loadTemplate() en templateGekozen() (zie editor.js).
     */
//    function loadPriveTemplate() {              //Alleen voor de klant
//        service.async(templatesUrl).then(function(data) {
//            document.body.style.cursor = 'wait';
//            var kaart;
//            for (kaart = 0; kaart < data.length; kaart++) {
//                if (data[kaart]._id.$oid === localStorage.selectedId) {
//                    loadTemplate(data[kaart]);
//                    templateGekozen(data[kaart]);
//                }
//            }
//            document.body.style.cursor = 'default';
//        });
//    }
});

/**
 * De controller van de homepage partial.
 * Hierin wordt het onclick event op het menu gezet
 */
app.controller('HomepageCtrl', function () {
    "use strict";
    menuOnclick();
});

app.controller('OverzichtCtrl', function (service) {
    "use strict";
    var small = document.getElementById("smallbutton"),
        medium = document.getElementById("mediumbutton"),
        large = document.getElementById("largebutton"),
        formaatSelected;

    localStorage.selectedId = "51c02cbfe4b06c863e244126";

    /**
     * functie waarbij de pngs van de gemaakte template wordt geladen
     *
     * @param data template data
     */
    function loadPreviews(data) {
        var voorkantPreviewImage = document.getElementById("voorkantPreviewImage"),
            binnenkantPreviewImage = document.getElementById("binnenkantPreviewImage"),
            envelopPreviewImage = document.getElementById("envelopPreviewImage");
        voorkantPreviewImage.src = data.templatePng;
        binnenkantPreviewImage.src = data.middenPng;
        envelopPreviewImage.src = data.achterkantPng;
    }


    /**
     * request functie waarbij de service de kaarten ophaalt
     */
    service.async(templatesUrl).then(function (data) {
        var kaart;
        //fix localstorage ID
        document.body.style.cursor = 'wait';
        for (kaart = 0; kaart < data.length; kaart++) {
            if (data[kaart]._id.$oid === localStorage.selectedId) {
                loadPreviews(data[kaart]);
            }
        }
        document.body.style.cursor = 'default';
    });


    /**
     * reset functie om de buttons deselecteerd te maken
     */
    function resetImgSrc() {
        small.src = "Content/images/buttons/small_unselected.png";
        medium.src = "Content/images/buttons/medium_unselected.png";
        large.src = "Content/images/buttons/large_unselected.png";
    }

    /**
     * toggle onclick functions voor toggles van de keuze maat van de kaart
     */
    small.onclick = function () {
        formaatSelected = small;
        resetImgSrc();
        small.src = "Content/images/buttons/small_selected.png";
    };

    medium.onclick = function () {
        resetImgSrc();
        medium.src = "Content/images/buttons/medium_selected.png";
        formaatSelected = medium;
    };

    large.onclick = function () {
        resetImgSrc();
        large.src = "Content/images/buttons/large_selected.png";
        formaatSelected = large;
    };

});

/**
 * De controller van de temlates partial.
 */
app.controller('TemplateCtrl', function (service) {
    'use strict';

    /**
     * Wanneer de partial geladen is worden eerst alle kaarten uit de database opgehaald.
     * Dit doen we, omdat we alleen de client kant hebben gebouwd en dus niet direct in de databse kunnen zoeken.
     * Wanneer een kaart in de gekozen categorie zit én een publieke kaart is (template),
     * wordt de kaart meegegeven aan getTemplate(). Hierin wordt een image gemaakt voor de kaart met de juiste attributen.
     * Daarna worden de de juiste functies toegevoegd via selecteerTemplate. (main.js)
     */
    service.async(templatesUrl).then(function (data) {
        document.body.removeChild(document.getElementById('overlay'));
        var kaart;
        for (kaart = 0; kaart < data.length; kaart++) {
            if (data[kaart].categorie === localStorage.categorie && data[kaart].private === "false") { //false als boolean gaf problemen
                getTemplate(data[kaart], data[kaart].positie);
            }
        }
        document.body.style.cursor = 'default';
        selecteerTemplate();
    });
});

app.controller('MijnPostkamerCtrl', function (service) {
    'use strict';

    service.async(templatesUrl).then(function (data) {
        document.body.removeChild(document.getElementById('overlay'));
        var kaart;
        for (kaart = 0; kaart < data.length; kaart++) {
            if (localStorage.loggedIn === "loggedIn" && data[kaart].email === localStorage.email) { //false als boolean gaf problemen
                getTemplate(data[kaart], data[kaart].positie);
            }
        }
        document.body.style.cursor = 'default';
        selecteerTemplate();
    });
});

app.controller('accountController', function (service, $scope) {

    $scope.login = function () {
        service.async(klantenUrl).then(function (data) {
            document.body.removeChild(document.getElementById('overlay'));
            var correct = false;
            for (var i = 0; i < data.length; i++) {
                var form = $('#inloggen');
                var data2 = form.serializeFormJSON();
                if (data[i].email == data2.email && data[i].password == data2.password) {
                    console.log("succesfull login");
                    localStorage.email = data[i].email;
                    window.location = "./postkamer.html#/mijnpostkamer";
                    checkIfLoggedIn();
                    correct = true;
                }
            }
            if (!correct) {
                alert("Niet correct!");
            }
            document.body.style.cursor = 'default';
        });
    };

    $scope.registreer = function () {
        var form = $('#registreerform');
        var data = form.serializeFormJSON();
        service.saveKlant(klantenUrl, data);
        alert("U bent geregistreerd");
    };
});