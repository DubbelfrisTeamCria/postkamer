app.controller('EditorCtrl', function( myService,$scope) {
    // Call the async method and then do stuff with what is returned inside our own then function
    myService.async().then(function(data) {
        $scope.customers = data;
    });
});

function askURL() {
    var url = prompt("Please give the url of the image");
    addImage(url);
}

function addImage(src) {
    canvas = document.getElementById('canvas')
    context = canvas.getContext('2d');
    var image = new Image();
    image.src = src;
    image.onload = function(){
        context.drawImage(image, 2, 2);
    }
}






