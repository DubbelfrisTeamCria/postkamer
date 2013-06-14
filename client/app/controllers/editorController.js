app.controller('EditorCtrl', function( service,$scope) {
    // Call the async method and then do stuff with what is returned inside our own then function
    service.async().then(function(data) {
        $scope.customers = data;
       // console.log(data[26]);
    });

    editor();
   $scope.save = function(){
        var data = getJSON();
        console.log(data);
        service.saveTemplate(data);
    };

    $scope.load = function(){
     service.async().then(function(data) {
           loadTemplate(data[0]);
        });
    }
});







