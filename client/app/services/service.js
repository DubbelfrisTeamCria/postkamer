/*global app */
/*jslint devel: true */

/**
 * De service welke voor de communicatie met de database zorgt. (mongolab).
 */
app.factory('service', function($http) {
    "use strict";
    /**
     * De url naar de templates in de database.
     * @type {String} url
     */
    var url = "https://api.mongolab.com/api/1/databases/postkamer/collections/templates?apiKey=9uG9lRHWlBDQeeLLotE_5FDaxUVUuGQC",

        service = {
            /**
             * Hiermee wordt de data asynchroon opgehaald.
             * In de controller is de data bereikbaar door 'then' toe te voegen:
             * 'service.async().then(function (data) { doe iets met de data }
             *
             * @return {*} de kaarten/ templates uit de database.
             */
            async: function() {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get(url).then(function (response) {
                    return response.data;
                });
                document.body.style.cursor = 'wait';
                return promise;
            },
            /**
             * Slaat de kaart op in de collectie 'templates' in de database.
             * @param data De kaart
             */
            saveTemplate : function(data) {
                console.log(data);
                $http.post(url, data);
            }
        };
    return service;
});





