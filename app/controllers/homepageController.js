//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is ultimately bound to the customers view
app.controller('HomepageCtrl', function( myService,$scope) {
    // Call the async method and then do stuff with what is returned inside our own then function
    myService.async().then(function(data) {
        $scope.test = data;


    });

});