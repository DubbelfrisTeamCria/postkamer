app.controller('EditorCtrl', function( service,$scope,$location) {

    $scope.$on('$locationChangeStart', function (event, next) {
        if (!opgeslagen) {
            if (!confirm("Je ontwerp is nog niet opgeslagen. Weet je zeker dat je nu naar " + next + " wil gaan?")) {
                event.preventDefault();
            }
        }
    });

    function setData() {
        if ($location.path() === "/editor") {
            localStorage.positie = "liggend";
            localStorage.enkel = false;

        } else if ($location.path() === "/editorEnkel") {
            localStorage.positie = "liggend";
            localStorage.enkel = true;

        } if ($location.path() === "/editorStaand") {
            localStorage.positie = "staand";
            localStorage.enkel = false;

        } if ($location.path() === "/editorStaandEnkel") {
            localStorage.positie = "staand";
            localStorage.enkel = true
        }
    }
    setData();

    console.log("editor controller loaded");
    document.body.style.cursor='wait';
    editor();
    var opgeslagen = false;

    $scope.save = function(){
        getPositie();
        getCategorie();
        var data = getJSON();
        console.log(data);
        opgeslagen = true;

        service.saveTemplate(data);
    };

    $scope.savePubliek = function(){
        getPositie();
        getCategorie();
        var data = getJSONTemplate();
        console.log(data);
        opgeslagen = true;

        service.saveTemplate(data);
    };

    service.async().then(function(data) {
        document.body.style.cursor='wait';
        for (var i = 0; i < data.length; i++) {
            if (data[i]._id.$oid === localStorage.selectedId) {
                loadTemplatePubliek(data[i]);
            }
        }
        document.body.style.cursor ='default';
    });

    function loadPriveTemplate() {              //Alleen voor de klant
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
});



