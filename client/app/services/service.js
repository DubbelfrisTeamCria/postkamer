/*global app */
/*jslint devel: true */

/**
 * De service welke voor de communicatie met de database zorgt. (mongolab).
 */
app.factory('service', function ($http) {
    "use strict";

    var service = {
        /**
         * Hiermee wordt de data asynchroon opgehaald.
         * In de controller is de data bereikbaar door 'then' toe te voegen:
         * 'service.async().then(function (data) { doe iets met de data }
         *
         * @return {*} de kaarten/ templates uit de database.
         */
        async:function (url) {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get(url).then(function (response) {
                return response.data;
            });
            addOverlay();
            document.body.style.cursor = 'wait';
            return promise;
        },
        /**
         * Slaat de kaart op in de collectie 'templates' in de database.
         * @param url de url naar de kaarten
         * @param data De kaart
         */
        saveTemplate:function (url, data) {
            console.log(data);
            $http.post(url, data);
        },

        /**
         * Slaat de klant op in de collectie 'klanten' in de database.
         * @param url de url naar de klanten
         * @param data de klant
         */
        saveKlant:function (url, data) {
            console.log(data);
            $http.post(url, data);
        },

        /**
         * Update de klant in de collectie 'klanten' in de database.
         * @param url de url naar de klanten
         * @param data de klant
         */
        updateKlant:function (url, data) {
            console.log(data);
            $http.find(url, data);
        }
    };
    return service;
});





