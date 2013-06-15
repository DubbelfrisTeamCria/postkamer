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

    function load() {
        service.async().then(function(data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i]._id.$oid === localStorage.selectedId) {
                    loadTemplate(data[i]);
                }
            }
        });
    }

    load();
});







