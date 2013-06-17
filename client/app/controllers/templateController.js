app.controller('TemplateCtrl', function( service,$scope) {
    // Call the async method and then do stuff with what is returned inside our own then function
    service.async().then(function(data) {
        $scope.customers = data;
    });

    console.log("Template controller opgehaald");  //controller wordt soms 2 keer opgehaald???

    service.async().then(function(data) {
        for (var i = 0; i < data.length; i++) {
            getTemplate(data[i], data[i].positie);
        }
        selecteerTemplate();
    });
});