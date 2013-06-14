app.controller('TemplateCtrl', function( service,$scope) {
    // Call the async method and then do stuff with what is returned inside our own then function
    service.async().then(function(data) {
        $scope.customers = data;
    });

    $scope.load = function(){
        service.async().then(function(data) {

            getTemplateStaand(data[0].template); // haal alle staande templates op. Alleen wanneer private == false!
            getTemplateLiggend(data[1].template);  // haal alle Liggende templates op. Alleen wanneer private == false!
            selecteerTemplate();

        });
    }
});