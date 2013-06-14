app.controller('TemplateCtrl', function( service,$scope) {
    // Call the async method and then do stuff with what is returned inside our own then function
    service.async().then(function(data) {
        $scope.customers = data;
    });

    service.async().then(function(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].positie === "liggend") {
                getTemplateLiggend(data[i].template);
            }
            else if (data[i].positie === "staand") {
                getTemplateStaand(data[i].template);
            }
        }
        selecteerTemplate();
    });
});