/**
 * Created with JetBrains PhpStorm.
 * User: juandavidcastellanos
 * Date: 6/5/13
 * Time: 1:36 PM
 * To change this template use File | Settings | File Templates.
 */

function editor() {
    var TAB;
    var canvas = new fabric.Canvas('canvas');
    var tekstMarge = 50;


    this.getJSON = function() {
        return JSON.stringify(canvas);
    }

    $('#bold').click(function(e){
        setBold(this);
    });
    $('#italic').click(function(e){
        setItalic(this);
    });
    $('#underline').click(function(e){
        setUnderline(this);
    });
//    $('#alignLeft').click(function(e){
//        setAlignLeft(this);
//    });
//    $('#alignCenter').click(function(e){
//        setAlignCenter(this);
//    });
//    $('#alignRight').click(function(e){
//        setAlignRight(this);
//    });

    $('li').click(function (e){
        TAB = this.id;
        e.preventDefault();
        if(TAB == "Bewerken1" || TAB == "Bewerken4"){
            $('#canvasPicker').show();
        }
        else{
            $('#canvasPicker').hide();
        }
        for(var i=1; i<5; i++){
            var temp = "Bewerken"+i;
            var tab = document.getElementById("Bewerken"+i);
            var content = document.getElementById("tabpage_"+i);
            if(tab.id === TAB){
                this.firstChild.src= "Content/images/tab"+i+"Select.png";
                content.style.display = "block";

            }
            else{
                tab.firstChild.src= "Content/images/tab"+i+".png";
                content.style.display = "none";
            }
        }
    });



    document.getElementById('imgLoader').onchange = function handleImage(e) {
        var reader = new FileReader();
        reader.onload = function (event) { console.log('fdsf');
            var imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function () {
                // start fabricJS stuff

                var image = new fabric.Image(imgObj);
                image.set({
                    left: 250,
                    top: 250,
                    angle: 0,
                    padding: 10,
                    cornersize: 10
                });
//                image.scale(0.1);
                canvas.add(image);

                // end fabricJS stuff
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }


    this.addImageBackground = function(){
        var imgObj = new Image();
        imgObj.src = "Content/images/shadowcard.png";
        imgObj.onload = function () {
            // start fabricJS stuff

            var image = new fabric.Image(imgObj);
            image.set({
                left: 320,
                top: 250,
                angle: 0,
                padding: 10,
                cornersize: 10
            });

            canvas.add(image);
            image.sendToBack();
            image.lockMovementX = true;
            image.lockMovementY = true;
            image.lockRotation  = true;
            image.lockUniScaling  = true;
            image.selectable = false;

            // end fabricJS stuff
        }
    }

    this.askText = function(){
        var text = prompt("wat wilt u erin zetten?");

        addText2(text);
    }

    this.addText2 = function(ingevuldtxt){
        var text = new fabric.Text(ingevuldtxt, { left: 50, top: 100, fontSize: 20 });
        text.originX = "left";
        canvas.add(text);
    }

    this.setChange = function(style,input,image){
        var text = canvas.getActiveObject();
        if(text){
            if(text[style] == input){
                text[style] = "normal";
                image.src = "Content/images/"+input+".png";
            }
            else{
                text[style] = input;
                image.src = "Content/images/"+input+"Select.png";
            }
            canvas.renderAll();
        }else{
            alert("u moet eerst een tekst selecteren!!")
        }

    }
    this.setBold = function(image){
        setChange("fontWeight","bold",image);
    }
    this.setItalic = function(image){
        setChange("fontStyle","italic",image);
    }

    this.setUnderline = function(image){
        setChange("textDecoration","underline",image);
    }

    function setImagesAlign(image) {
        for (var i = 1; i < 4; i++) {
            if (image.id === ("align" + i)) {
                image.src = "Content/images/align" + i + "Select.png";
            }
            else {
                document.getElementById("align" + i).src = "Content/images/align" + i + ".png";
            }
        }
    }

    this.setAlign = function(kant, marge,image) {
        var objectSelected = canvas.getActiveObject();
        if(objectSelected){
            objectSelected.originX = kant;
            objectSelected.left = marge;
            setImagesAlign(image);
        }
        canvas.renderAll();
    }

    $('#align1').click(function() {
        setAlign('left', tekstMarge,this);
    });
    $('#align2').click(function() {
        setAlign('center', canvas.width/2,this);
    });
    $('#align3').click(function() {
        setAlign('right', canvas.width-tekstMarge,this);
    });

    //verander cursor
    $('.tabs > li').hover(function() {$(this).css('cursor','pointer');}); //handje
    $('#tabpage_1 > img').hover(function() {$(this).css('cursor','pointer');}); //handje
    $('#picker').hover(function() {$(this).css('cursor','crosshair');}); //kruisje

    this.colorpicker =function(){
        var c = document.getElementById("picker");
        var ctx = c.getContext('2d');
        var image = new Image();
        image.src = "Content/images/colorwheel.png";

        image.onload = function(){
            ctx.drawImage(image,1,1)
        }

        function geefKleur(e){
            //cordinaten van momentele positie
            var canvasOffset = $(c).offset();
            var canvasX = Math.floor(e.pageX-canvasOffset.left);
            var canvasY = Math.floor(e.pageY-canvasOffset.top);
            //momenteel pixel (rgba in array)
            var imageData = ctx.getImageData(canvasX,canvasY,1,1);
            var pixel = imageData.data;
            //rgb
            var kleurPixel = "rgb("+pixel[0]+", "+pixel[1]+", "+pixel[2]+")";
            return kleurPixel;
        }
        //hier kies je een kleur eventhandler
        $('#picker').click(function(e){
            var kleurPixel = geefKleur(e);
            if(TAB == "Bewerken1"){
                if (canvas.getActiveObject() && canvas.getActiveObject().type === "text") {
                    console.log("text object selected");
                    kleurtext(canvas.getActiveObject(), kleurPixel);
                }else{
                    console.log("no text object selected");}
            }
            else if(TAB == "Bewerken4"){
                vulKleur(kleurPixel);
            }
        })
    }

    this.achtergrondImage = function() {
        var image=prompt("kies een ahtergrond image url");
        canvas.setBackgroundImage(image, function() {
            if(image[1]!=null){
                canvas.backgroundColor = 'none';
            }
            canvas.renderAll();
        });
    }

    /**
     *
     * @param text
     * @param kleur
     */
    var kleurtext = function(text, kleur) {
        text.fill = kleur;
        canvas.renderAll();
    }

    /**
     * Verander de kleur van de achtergrond.
     * @param kleur de kleur van de achtergrond
     */
    var vulKleur = function(kleur) {
        if(canvas.backgroundImage) {
            canvas.backgroundImage = 'none';
        }
        canvas.backgroundColor = kleur;
        canvas.renderAll();
    }

    /**
     * Wijzig de tekst van het geselecteerde tekst object wanneer er getyped wordt.
     */
    $(document).keydown(function(e){
        var keyPressed = String.fromCharCode(e.which);
        var text = canvas.getActiveObject();
        if (text) {
            var oudeKleur = text.fill;
            text.fill = "rgb(255,0,0)";
            var newText = '';
            var stillTyping = true;
            if (e.which == 27)  { //27 = esc
                if (!text.originalText) return; //if there is no original text, there is nothing to undo
                newText = text.originalText;
                stillTyping = false;
            }
            else { //if the user wants to make a correction
                if (!text.originalText) {//Store the original text before beginning to type
                    text.originalText = text.text;
                }
                //if the user wants to remove all text, or the element entirely
                if (e.which == 46) { // 46 = delete
                    activeObject.element.remove(true);
                    return;
                }
                else if (e.which == 16) { //16 = shift
                    newText = text.text;
                }
                else if (e.which == 8) {//8 = backspace
                    e.preventDefault();
                    newText = text.text.substr(0, text.text.length - 1);
                }
                else if (e.which == 13){ //13 = enter
                    //canvas clear selection
                    canvas.discardActiveObject();
                    canvas.renderAll();
                    canvasBeforeSelectionCleared({ memo: { target: text} });
                    newText = text.text;
                    stillTyping = false;
                }
                //if the user is typing alphanumeric characters
                else if (
                    (e.which > 64 && e.which < 91) || //A-Z
                        (e.which > 47 && e.which < 58) || //0-9
                        (e.which == 32) || //Space
                        (keyPressed.match(/[!&()"'?-]/)) //Accepted special characters
                    ) {
                    if (text.text == text.originalText) text.text = '';
                    if (keyPressed.match(/[A-Z]/) && !e.shiftKey)
                        keyPressed = keyPressed.toLowerCase();
                    newText = text.text + keyPressed;
                }
            }
            text.set({ text: newText }); //Change the text
            canvas.renderAll();

            if (!stillTyping) {
                this.text.originalText = null;
            }
        }
        text.fill = oudeKleur;
    });


    /**
     * Reset het canvas.
     */
    this.reset =function(){
        canvas.clear();
    }

    /**
     * Verwijder geselecteerde object.
     */
    this.removeObject =function(){
        var objectSelected = canvas.getActiveObject();
        canvas.remove(objectSelected);
    }

    /**
     * Haal het geselecteerde object naar voren.
     */
    this.bringToFront= function(){
        var objectSelected = canvas.getActiveObject();
        objectSelected.bringToFront();
    }

    /**
     * Zet de transparantie van het geselecteerde plaatje.
     * Moet niet werken bij tekst.
     */
    document.getElementById('transSlider').onchange = function(){
        var value =this.value/100;
        var objectSelected = canvas.getActiveObject();
        if(objectSelected.type === "image") {
            objectSelected.setOpacity(value);
            canvas.renderAll();
        }
    }

    /**
     * Zet de brightness van het geselecteerde plaatje.
     * Moet niet werken bij tekst.
     */
    document.getElementById('brightnessSlider').onchange = function(){
        var value = parseInt(this.value);
        var objectSelected = canvas.getActiveObject();
        if(objectSelected.type === "image") {
            if(!objectSelected.filters[0]) {
                objectSelected.filters.push(new fabric.Image.filters.Brightness({ brightness: value }));
            }
            else {
                objectSelected.filters[0]['brightness'] = value;
            }
            objectSelected.applyFilters(canvas.renderAll.bind(canvas));
        }
    }

    /**
     * Zet de tint van het geselecteerde plaatje.
     * Moet niet werken bij tekst.
     */
    document.getElementById('tint').onchange = function(){
        console.log("nog niet gemaakt");
        var value = parseInt(this.value);
        var objectSelected = canvas.getActiveObject();
        if(objectSelected.type === "image") {
//        if(!objectSelected.filters[1]) {
//            objectSelected.filters.push(new fabric.Image.filters.Tint({ color: '00FF00'}));
//        }
//        else {
//            objectSelected.filters[1]['tint'] = 'rgb(255,0,0)';
//        }
//        objectSelected.applyFilters(canvas.renderAll.bind(canvas));
        }
    }

    /* Selection opcity hover

     canvas.on('mouse:move', function(options) {

     var p = canvas.getPointer(options.e);

     canvas.forEachObject(function(obj) {
     var distX = Math.abs(p.x - obj.left),
     distY = Math.abs(p.y - obj.top),
     dist = Math.round(Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2)));

     obj.setOpacity(2 / (dist / 100));
     });

     canvas.renderAll();
     });
     */
    $('#combo').click(function (e){
        var text = canvas.getActiveObject();
        if(text){
            this.setFont = function(){
                var combobox = document.getElementById("combo");
                var selected = combobox.options[combobox.selectedIndex].text;
                setChange("fontFamily",selected);
            }
        }
        else{
//            alert("u moet eerst een tekst selecteren!!");
        }
    });
}

