app.controller('EditorCtrl', function( service,$scope) {
    // Call the async method and then do stuff with what is returned inside our own then function
    srvice.async().then(function(data) {
        $scope.customers = data;
    });
});







