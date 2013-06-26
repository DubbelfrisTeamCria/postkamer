//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is ultimately bound to the customers view
app.controller('accountController', function( serviceKlanten,$scope) {
    // Call the async method and then do stuff with what is returned inside our own then function
    serviceKlanten.async().then(function(data) {
        $scope.test = data;
        console.log(data)
    });



    $scope.login = function(){

        serviceKlanten.async().then(function(data){
            for(var i = 0 ; i <data.length ; i ++){
                var $form = $('#inloggen');
                var data2 = $form.serializeFormJSON();

                if(data[i].email == data2.email && data[i].password == data2.password){

                    console.log("succesfull login");
                    localStorage.email = data[i].email;
                    localStorage.location = "/postkamer/client/postkamer.html"
                    checkIfLoggedIn();

                }
                else{
                    console.log("unsuccesfull login")
                }
            }
        })


    }



    var $form = $('#registreerform');
    $form.on('submit', function (e) {
        $('#loginknop').toggleClass("disabled");

        var data = $form.serializeFormJSON();


        serviceKlanten.saveKlant(data);

        e.preventDefault();
        return false;
    });


});