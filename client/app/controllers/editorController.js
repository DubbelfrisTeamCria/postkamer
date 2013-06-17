app.controller('EditorCtrl', function( service,$scope) {
    // Call the async method and then do stuff with what is returned inside our own then function

    $scope.$on('$locationChangeStart', function (event, next, current) {
        if (!opgeslagen) {
            if (!confirm("Je ontwerp is nog niet opgeslagen. Weet je zeker dat je nu naar " + next + " wil gaan?")) {
                event.preventDefault();
            }
        }
    });

    console.log("editor controller loaded");

    document.body.style.cursor='wait';
    editor();
    var opgeslagen = false;

    $scope.save = function(){
        var data = getJSON();
        console.log(data);
        opgeslagen = true;
        service.saveTemplate(data);
    };

    service.async().then(function(data) {
        document.body.style.cursor='wait';
        for (var i = 0; i < data.length; i++) {
            if (data[i]._id.$oid === localStorage.selectedId) {
                loadTemplate(data[i]);
            }
        }
        document.body.style.cursor ='default';
    });

});







