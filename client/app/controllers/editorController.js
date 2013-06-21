/*global app, editor, getJSON, getJSONTemplate, loadTemplatePubliek, templateGekozen, loadTemplate */
/*jslint browser: true, devel: true, nomen: true */

/**
 * De controller van de homepage partial.
 */
app.controller('EditorCtrl', function(service, $scope, $location) {
    "use strict";

    var opgeslagen = false;
    $scope.$on('$locationChangeStart', function (event, next) {
        if (!opgeslagen) {
            if (!confirm("Je ontwerp is nog niet opgeslagen. Weet je zeker dat je nu naar " + next + " wil gaan?")) {
                event.preventDefault();
            }
        }
    });

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

    console.log("editor controller loaded");
    document.body.style.cursor = 'wait';
    editor();

    $scope.save = function() {
        var data = getJSON();
        console.log(data);
        opgeslagen = true;

        service.saveTemplate(data);
    };

    $scope.savePubliek = function() {
        var data = getJSONTemplate();
        console.log(data);
        opgeslagen = true;

        service.saveTemplate(data);
    };

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

//    function loadPriveTemplate() {              //Alleen voor de klant
//        service.async().then(function(data) {
//            document.body.style.cursor = 'wait';
//            var kaart;
//            for (kaart = 0; kaart < data.length; kaart++) {
//                if (data[kaart]._id.$oid === localStorage.selectedId) {
//                    loadTemplate(data[kaart]);
//                }
//            }
//            document.body.style.cursor = 'default';
//        });
//    }
});



