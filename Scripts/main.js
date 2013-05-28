window.onLoad=function(){
    canvas = $('#canvas');
    context = canvas.getContext('2d');
    canvas.css({backgroundColor:"rgb(245, 8, 8)"});  //werkt nog niet
};
var canvas, context;

function askURL() {
    var url = prompt("Please give the url of the image");
    addImage(url);
}

function addImage(src) {

    var image = new Image();
    image.src = src;
    image.onload = function(){
        context.drawImage(image, 2, 2);
    }
}



