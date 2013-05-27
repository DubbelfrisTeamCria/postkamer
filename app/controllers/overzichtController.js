app.controller('OverzichtCtrl', function( myService,$scope) {
    // Call the async method and then do stuff with what is returned inside our own then function
    myService.async().then(function(data) {
        $scope.customers = data;
    });
});