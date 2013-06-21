/*global app, getTemplate, selecteerTemplate */
/*jslint browser: true */

/**
 * De controller van de temlates partial.
 */
app.controller('TemplateCtrl', function(service) {
    'use strict';

    /**
     * Wanneer de partial geladen is worden eerst alle kaarten uit de database opgehaald.
     * Dit doen we, omdat we alleen de client kant hebben gebouwd en dus niet direct in de databse kunnen zoeken.
     * Wanneer een kaart in de gekozen categorie zit én een publieke kaart is (template),
     * wordt de kaart meegegeven aan getTemplate(). Hierin wordt een image gemaakt voor de kaart met de juiste attributen.
     * Daarna worden de de juiste functies toegevoegd via selecteerTemplate. (main.js)
     */
    service.async().then(function(data) {
        document.body.style.cursor = 'wait';
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