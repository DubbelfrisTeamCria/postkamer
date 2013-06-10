/**
 * Created with JetBrains PhpStorm.
 * User: juandavidcastellanos
 * Date: 6/5/13
 * Time: 1:36 PM
 * To change this template use File | Settings | File Templates.
 */

function editor() {
    var canvas = new fabric.Canvas('canvas');

    this.printNaarConsole = function() {
        console.log(JSON.stringify(canvas));
    }

    /*canvas.on('object:selected', function(e) {
     alert(" IM SELECTED");
     var activeObject = e.target;
     canvas.remove(activeObject);
     });*/

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
                    angle: 20,
                    padding: 10,
                    cornersize: 10
                });
                image.scale(0.1);
                canvas.add(image);

                // end fabricJS stuff
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    this.askText = function(){
        var text = prompt("wat wilt u erin zetten?");

        addText2(text);
    }

    function addText2(ingevuldtxt){
        var text = new fabric.Text(ingevuldtxt, { left: 100, top: 100 });
        canvas.add(text);
    }

    this.setChange = function(style,input){
        var text = canvas.getActiveObject();
        if(text){
            if(text[style] == input){
                text[style] = "normal";
            }
            else{
                text[style] = input;

                console.log(text);
            }
            canvas.renderAll();
        }else{
            alert("u moet eerst een tekst selecteren!!")
        }

    }
    this.setBold = function(){
        setChange("fontWeight","bold");
    }
    this.setItalic = function(){
        setChange("fontStyle","italic");
    }

    this.setUnderline = function(){
        setChange("textDecoration","underline");
    }

    this.colorpicker =function(){
        var c = document.getElementById("picker");
        var ctx = c.getContext('2d');
        var image = new Image();
        image.src = "Content/images/colorwheel.png";

        image.onload = function(){
            ctx.drawImage(image,1,1)
        }

        //hier kies je een kleur eventhandler
        $('#picker').click(function(e){
            //cordinaten van momentele positie
            var canvasOffset = $(c).offset();
            var canvasX = Math.floor(e.pageX-canvasOffset.left);
            var canvasY = Math.floor(e.pageY-canvasOffset.top);
            //momenteel pixel (rgba in array)
            var imageData = ctx.getImageData(canvasX,canvasY,1,1);
            var pixel = imageData.data;
            //rgb
            var kleurPixel = "rgb("+pixel[0]+", "+pixel[1]+", "+pixel[2]+")";

            if (canvas.getActiveObject() && canvas.getActiveObject().type === "text") {
                console.log("text object selected");
                kleurtext(canvas.getActiveObject(), kleurPixel);
            } else {
                console.log("no text object selected");
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

    var kleurtext = function(text, kleur) {
        text.fill = kleur;
        canvas.renderAll();

    }

    var vulKleur = function(kleur) {
        if(canvas.backgroundImage) {
            canvas.backgroundImage = 'none';
        }
        canvas.backgroundColor = kleur;
        canvas.renderAll();
    }

    $(document).keydown(function(e){
        var keyPressed = String.fromCharCode(e.which);
        var text = canvas.getActiveObject();
        if (text)
        {
            var oudeKleur = text.fill;
            text.fill = "rgb(255,0,0)";
            var newText = '';
            var stillTyping = true;
            if (e.which == 27) //esc
            {
                if (!text.originalText) return; //if there is no original text, there is nothing to undo
                newText = text.originalText;
                stillTyping = false;
            }
            //if the user wants to make a correction
            else
            {
                //Store the original text before beginning to type
                if (!text.originalText)
                {
                    text.originalText = text.text;
                }
                //if the user wants to remove all text, or the element entirely
                if (e.which == 46) //delete
                {
                    activeObject.element.remove(true);
                    return;
                }
                else if (e.which == 16) { //shift
                    newText = text.text;
                }
                else if (e.which == 8) //backspace
                {
                    e.preventDefault();
                    newText = text.text.substr(0, text.text.length - 1);
                }
                else if (e.which == 13) //enter
                {
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
                    )
                {
                    if (text.text == text.originalText) text.text = '';
                    if (keyPressed.match(/[A-Z]/) && !e.shiftKey)
                        keyPressed = keyPressed.toLowerCase();
                    newText = text.text + keyPressed;
                }
            }
            text.set({ text: newText }); //Change the text
            canvas.renderAll(); //Update the canvas

            if (!stillTyping)
            {
                this.text.originalText = null;
            }
        }
        text.fill = oudeKleur;
    });


    this.reset =function(){
        canvas.clear();
    }

    this.removeObject =function(){
        var objectSelected = canvas.getActiveObject();
        canvas.remove(objectSelected);

    }

    this.bringToFront= function(){
        var objectSelected = canvas.getActiveObject();
        objectSelected.bringToFront();
    }

    document.getElementById('transSlider').onchange = function(){
        var value =this.value/100;

        var objectSelected = canvas.getActiveObject();
        objectSelected.setOpacity(value);
        canvas.renderAll();
    }

    document.getElementById('brightnessSlider').onchange = function(){
        var value = parseInt(this.value);
        var objectSelected = canvas.getActiveObject();
        if(!objectSelected.filters[0]) {
            objectSelected.filters.push(new fabric.Image.filters.Brightness({ brightness: value }));
        }
        else {
            objectSelected.filters[0]['brightness'] = value;
        }
        objectSelected.applyFilters(canvas.renderAll.bind(canvas));
    }

    document.getElementById('tint').onchange = function(){
//        var value = parseInt(this.value);
        var objectSelected = canvas.getActiveObject();
//        if(!objectSelected.filters[1]) {
//            objectSelected.filters.push(new fabric.Image.filters.Tint({ color: '00FF00'}));
//        }
//        else {
//            objectSelected.filters[1]['tint'] = 'rgb(255,0,0)';
//        }
//        objectSelected.applyFilters(canvas.renderAll.bind(canvas));
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

