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

function vulKleur(){
   var c = document.getElementById('canvas');
    var ctx = c.getContext('2d');
    ctx.rect(188, 50, 200, 100);
    ctx.fillStyle="red";
    console.log(ctx.fillStyle);
    console.log(ctx.fill);
}
function addImage(src) {
    var image = new Image();
    image.src = src;
    image.onload = function(){
        context.drawImage(image, 2, 2);
    }
}



