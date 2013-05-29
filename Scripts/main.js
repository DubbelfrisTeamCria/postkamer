function askURL() {
    var url = prompt("Please give the url of the image");
    addImage(url);
}

function vulKleur(){
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.rect(0, 0, canvas.width, canvas.height);
    var achtergrondkleur = "006DCC";                //kleur uit colorpicker halen wanneer deze bestaat.
    context.fillStyle = achtergrondkleur;
    context.fill();
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



