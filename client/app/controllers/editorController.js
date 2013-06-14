app.controller('EditorCtrl', function( service,$scope) {
    // Call the async method and then do stuff with what is returned inside our own then function
    service.async().then(function(data) {
        $scope.customers = data;
       // console.log(data[26]);

    });

    editor()

//    var voorkantCanvas = new editor('canvas');
//   var binnenkantCanvas = new editor('binnenkantcanvas');
//   // var envelopCanvas  = new editor('envelopcanvas');


     var voorkant = $("#canvas");
    var binnenkant = $("#binnenkantcanvas");
    var envelop = $("#envelopcanvas");








//    function setHidden(){
//        binnenkant.parent().css('display' ,'none');
//        envelop.parent().css('display' ,'none');
//
//    }
//
//    setHidden();
//
//
//
//    $('#voorKant').click(function(){
//        voorkant.parent().css('display' ,'block');
//        binnenkant.parent().css('display' ,'none');
//        envelop.parent().css('display' ,'none');
//    });
//
//
//
//    $('#binnenKant').click(function(){
//        canvas = binnenkantcanvas;
//        binnenkant.parent().css('display' ,'block');
//        voorkant.parent().css('display' ,'none');
//        envelop.parent().css('display' ,'none');
//    });
//
//
//    $('#envelop').click(function(){
//        canvas = envelopcanvas;
//        envelop.parent().css('display' ,'block');
//        binnenkant.parent().css('display' ,'none');
//        voorkant.parent().css('display' ,'none');
//    });



   $scope.save = function(){

        var data = getJSON();
        console.log(data);

        service.saveTemplate(data);
    }



    $scope.load = function(){
     service.async().then(function(data) {

           loadTemplate(data[1]);
        })

    }






});







