/**
 * Created with JetBrains PhpStorm.
 * User: amber_000
 * Date: 7-5-13
 * Time: 10:57
 * To change this template use File | Settings | File Templates.
 */

var desktop = angular.module('desktop', []);

function TestController($scope) {
    $scope.klanten = [
        {naam: 'Amber Schühmacher', stad: 'Arnhem'},
        {naam: 'Almira Jahja', stad: 'Doetinchem'}
    ];

    $scope.voegKlantToe = function () {
        $scope.klanten.push(
            {
                naam: $scope.inputData.naam,
                stad: $scope.inputData.stad
            });
    }
}

/**
 * Hiermee kun je een klant toevoegen aan de database dubbelfris. Hier kun je de collectie terugzien:
 * https://mongolab.com/databases/dubbelfris/collections/klanten?q=&f=&s=&pageNum=0&pageSize=10
 * @param $scope
 * @param $http
 * @constructor
 */
function MongoLabController($scope, $http) {
    $scope.addKlant = function() {
        var data = {
            naam:$scope.klantnaam,
            stad:$scope.klantstad
        };
        var url = 'https://api.mongolab.com/api/1/databases/dubbelfris/collections/klanten?apiKey=9uG9lRHWlBDQeeLLotE_5FDaxUVUuGQC';

        $http.post(url, data);
    }
}

desktop.controller('TestController', TestController);
desktop.controller('MongoLabController', MongoLabController);