app.controller('OverzichtCtrl', function( service,$scope) {
    // Call the async method and then do stuff with what is returned inside our own then function
    localStorage.selectedId = "51c02cbfe4b06c863e244126";





    service.async().then(function(data) {

        //todo fix localstorage ID
        document.body.style.cursor='wait';
        for (var i = 0; i < data.length; i++) {
            if (data[i]._id.$oid === localStorage.selectedId) {
                loadPreviews(data[i]);
            }
        }
        document.body.style.cursor ='default';
    });







    var small = document.getElementById("smallbutton");
    var medium = document.getElementById("mediumbutton");
    var large = document.getElementById("largebutton");
    var formatselected= null;

    small.onclick = function(){
        formaatSelected = small;
        resetImgSrc();
        small.src="Content/images/buttons/small_selected.png";
    };

    medium.onclick = function(){
        resetImgSrc();
        medium.src="Content/images/buttons/medium_selected.png";
        formaatSelected = medium;

    };

    large.onclick = function(){
        resetImgSrc();
        large.src="Content/images/buttons/large_selected.png";
        formaatSelected = large;

    };


    function resetImgSrc(){
        small.src="Content/images/buttons/small_unselected.png";
        medium.src="Content/images/buttons/medium_unselected.png";
        large.src="Content/images/buttons/large_unselected.png";
    }

    function loadPreviews(data){

        var voorkantPreviewImage = document.getElementById("voorkantPreviewImage");

        var binnenkantPreviewImage = document.getElementById("binnenkantPreviewImage");

        var envelopPreviewImage = document.getElementById("envelopPreviewImage");

        voorkantPreviewImage.src=data.templatePng;
        binnenkantPreviewImage.src=data.middenPng;
        envelopPreviewImage.src=data.achterkantPng;

    }


    function loadKaart(){

    }




});