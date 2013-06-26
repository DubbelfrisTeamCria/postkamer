//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is ultimately bound to the customers view
app.controller('accountController', function (serviceKlanten, $scope) {
    // Call the async method and then do stuff with what is returned inside our own then function

    $scope.login = function () {
        serviceKlanten.async().then(function (data) {
            for (var i = 0; i < data.length; i++) {
                var form = $('#inloggen');
                var data2 = form.serializeFormJSON();
                if (data[i].email == data2.email && data[i].password == data2.password) {
                    console.log("succesfull login");
                    localStorage.email = data[i].email;
                    window.location = "./postkamer.html#/MijnPostKamer";
                    checkIfLoggedIn();

                }
            }
        });
    };

    $scope.registreer = function() {
        var form = $('#registreerform');
        var data = form.serializeFormJSON();
        serviceKlanten.saveKlant(data);
        alert("U bent geregistreerd");
    };

});