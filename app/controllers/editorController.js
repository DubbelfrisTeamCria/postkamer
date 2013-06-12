app.controller('EditorCtrl', function( service,$scope) {
    // Call the async method and then do stuff with what is returned inside our own then function
    service.async().then(function(data) {
        $scope.customers = data;
    });

    editor();
    colorpicker();
    addText2("Vul hier je tekst in...");

    addImageBackground();







   $scope.save = function(){

        var data = getJSON();
        console.log(data);

        service.saveTemplate(data);
    }




});







