function askURL() {
    var url = prompt("Please give the url of the image");
    addImage(url);
}

function vulKleur(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.rect(0, 0, canvas.width, canvas.height);
    var achtergrondkleur = "006DCC";                //kleur uit colorpicker halen wanneer deze bestaat.
    context.fillStyle = achtergrondkleur;
    context.fill();
}

function addImage(src) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
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
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var text = new Text();
    text.setTekst(ingevuldTxt);
    text.setTekstStyle("30px Comic sans");
    context.font = text.getTekstStyle();
    context.fillText(text.getTekst(),1,60);
}

function selectTemplate() {
    $('.template').click(function() {               //fout
        $('.template').removeAttr("id");
        $(this).attr('id', 'selectedTemplate');
        console.log("bla");
    });
}

(function() {                                       //werkt niet
    $('.template').click(function() {
        alert("onclick op class toegevoegd");
    });
})();

function enkelCanvas() {
    var enkel = null;
    if (document.getElementById('enkel').checked) {
        enkel = true;
    }
    else if (document.getElementById('dubbel').checked) {
        enkel = false;
    }
    return enkel;
}

function templateKeus() {
    enkelCanvas();
    console.log("enkel = " + enkelCanvas());
    if (!document.getElementById('selectedTemplate')) {
        alert("kies eerst een template");
    }
    else {
        staandCanvas();
        console.log("staand = " + staandCanvas());
        staandOfLiggendCanvas();
    }
}

function staandOfLiggendCanvas() {
    if (staandCanvas()) {
        $('#templateFooter > a').attr({href:"#/editorStaand",'data-ng-class':"{'active':getClass('/editorStaand')}"});
    }
    else if (!staandCanvas()) {
        $('#templateFooter > a').attr({href:"#/editor",'data-ng-class':"{'active':getClass('/editor')}"});
    }
}

function staandCanvas() {

    var selected = document.getElementById('selectedTemplate');
    var staand = null;
    if (selected.className === "templateLiggend template") {
        staand = false;
    }
    else if (selected.className === "templateStaand template") {
        staand = true;
    }
    return staand;
}

function colorpicker(){
    var c = document.getElementById("picker");
    var ctx = c.getContext('2d');

    var image = new Image();
    image.src = "Content/images/colorwheel.png";
    image.onload = function(){
        ctx.drawImage(image,1,1)
    }
//    var kleurPixel;
//    console.log(kleurPixel);

    //hier kies je een kleur eventhandler
    $('#picker').click(function(e){
        //cordinaten van momentele positie
        var canvasOffset = $(c).offset();
        var canvasX = Math.floor(e.pageX-canvasOffset.left);
        var canvasY = Math.floor(e.pageY-canvasOffset.top);
        //momenteel pixel
        var imageData = ctx.getImageData(canvasX,canvasY,1,1);
        var pixel = imageData.data;
        //pixel
        var kleurPixel = "rgb("+pixel[0]+", "+pixel[1]+", "+pixel[2]+")";
        console.log(kleurPixel);
    })

//    $('#picker').click(function(e){
//        console.log(kleurPixel);
//    })

}


