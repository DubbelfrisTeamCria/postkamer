/*global app, editor, getJSON, getJSONTemplate, loadTemplatePubliek, templateGekozen, loadTemplate */
/*jslint browser: true, devel: true, nomen: true */

/**
 * De controller van de editor partial.
 */
app.controller('EditorCtrl', function(service, $scope, $location) {
    "use strict";

    var opgeslagen = false;

    /**
     * Wanneer de gebruiker de editor wil verlaten en de kaart is niet opgeslagen,
     * wordt er een alert getoond om om bevestiging te vragen.
     */
    $scope.$on('$locationChangeStart', function (event, next) {
        if (!opgeslagen) {
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
     * De data wordt als test uitgeprint in de console.
     * De boolean 'opgeslagen' wordt op true gezet, zodat de gebruiker de editor kan verlaten zonder waarschuwing.
     * Daarna wordt de kaart opgeslagen in de database door de service (zie service.js)
     */
    $scope.save = function() {
        var data = getJSON();
        console.log(data);
        opgeslagen = true;
        service.saveTemplate(data);
    };

    /**
     * Slaat de kaart van de gebruiker op. (publieke kaart/ template.)
     * De kaart wordt in een JSON formaat opgeslagen met de functie getJSONTemplate() (in de editor.js).
     * De data wordt als test uitgeprint in de console.
     * De boolean 'opgeslagen' wordt op true gezet, zodat de gebruiker de editor kan verlaten zonder waarschuwing.
     * Daarna wordt de kaart opgeslagen in de database door de service (zie service.js)
     *
     */
    $scope.savePubliek = function() {
        var data = getJSONTemplate();
        console.log(data);
        opgeslagen = true;
        service.saveTemplate(data);
    };

    /**
     * Wanneer de partial geladen is worden eerst alle kaarten uit de database opgehaald.
     * Dit doen we, omdat we alleen de client kant hebben gebouwd en dus niet direct in de databse kunnen zoeken.
     * Wanneer een kaart hetzelfde id heeft als het id in de localStorage,
     * wordt de kaart meegegeven aan loadTemplatePubliek() en templateGekozen() (zie editor.js).
     */
    service.async().then(function (data) {
        document.body.style.cursor = 'wait';
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
//        service.async().then(function(data) {
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



