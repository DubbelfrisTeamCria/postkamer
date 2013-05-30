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

function askText(){
    var text = prompt("wat wilt u erin zetten?");
    addText(text);
}

function addText(ingevuldTxt){
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    var text = new Text();
    text.setTekst(ingevuldTxt);
    text.setTekstStyle("30px Comic sans");
    context.font = text.getTekstStyle();
    context.fillText(text.getTekst(),1,60);
    //hellow amber

}



