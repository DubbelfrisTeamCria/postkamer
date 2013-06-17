app.controller('EditorCtrl', function( service,$scope) {
    // Call the async method and then do stuff with what is returned inside our own then function
    service.async().then(function(data) {
        $scope.customers = data;
        // console.log(data[26]);
    });

    $scope.$on('$locationChangeStart', function (event, next, current) {
        if (!opgeslagen) {
            event.preventDefault();
            var answer = confirm("Weet je zeker dat je je ontwerp niet wil opslaan?")
            if (answer) {
                $location.url($location.url(next).hash());
                $rootScope.$apply();
            }
        }
    });

    editor();
    var opgeslagen = false;
    $scope.save = function(){
        var data = getJSON();
        console.log(data);

        service.saveTemplate(data);
        opgeslagen = true;
    };

    function load() {
        service.async().then(function(data) {
            document.body.style.cursor='wait';
            for (var i = 0; i < data.length; i++) {
                if (data[i]._id.$oid === localStorage.selectedId) {
                    loadTemplate(data[i]);
                }
            }
            document.body.style.cursor ='default';
        });
    }
    load();
});







