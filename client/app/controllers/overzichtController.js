/*global app */
/*jslint browser: true, devel: true, nomen: true, plusplus: true */

app.controller('OverzichtCtrl', function(service) {
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
    service.async().then(function(data) {
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
    small.onclick = function() {
        formaatSelected = small;
        resetImgSrc();
        small.src = "Content/images/buttons/small_selected.png";
    };

    medium.onclick = function() {
        resetImgSrc();
        medium.src = "Content/images/buttons/medium_selected.png";
        formaatSelected = medium;
    };

    large.onclick = function() {
        resetImgSrc();
        large.src = "Content/images/buttons/large_selected.png";
        formaatSelected = large;
    };

});