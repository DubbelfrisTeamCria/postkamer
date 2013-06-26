//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with
//each doing the same thing just structuring the functions/data differently.

app.factory('serviceKlanten', function($http) {
    var url = "https://api.mongolab.com/api/1/databases/postkamer/collections/klanten?apiKey=9uG9lRHWlBDQeeLLotE_5FDaxUVUuGQC";

    var serviceKlanten = {
        async: function() {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get(url).then(function (response) {
                // The then function here is an opportunity to modify the response

                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        },
        saveKlant : function(data){
            console.log(data);
            $http.post(url, data);
        },



        updateKlant : function(data){
            console.log(data);
            $http.find(url, data);
        }

    };
    return serviceKlanten;
});


