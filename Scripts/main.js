function askURL() {
    var url = prompt("Please give the url of the image");
    addImage(url);
}

function addImage(src) {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    var image = new Image();
    image.src = src;
    image.onload = function(){
        context.drawImage(image, 2, 2);
    }
}

