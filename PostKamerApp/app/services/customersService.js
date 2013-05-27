//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with
//each doing the same thing just structuring the functions/data differently.




app.factory('myService', function($http) {
    var url = "https://api.mongolab.com/api/1/databases/postkamer/collections/templates?apiKey=9uG9lRHWlBDQeeLLotE_5FDaxUVUuGQC";

    var myService = {
        async: function() {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get(url).then(function (response) {
                // The then function here is an opportunity to modify the response
                console.log(response);

                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return myService;
});








