function editor() {

    var canvas = null;
    var TAB = "Bewerken1";
    var voorkantcanvas = new fabric.Canvas('canvas');
    var binnenkantcanvas = new fabric.Canvas('binnenkantcanvas');
    var envelopcanvas = new fabric.Canvas('envelopcanvas');
    var voorkant = $("#canvas");
    var binnenkant = $("#binnenkantcanvas");
    var envelop = $("#envelopcanvas");
    var tekstMarge = 50;
    var standaardImageBreedte = 200;

    setHidden();
    colorpicker();
    addText2("Vul hier je tekst in...");
    addImageBackground();

    function setHidden(){
        canvas = voorkantcanvas;
        binnenkant.parent().css('display' ,'none');
        envelop.parent().css('display' ,'none');
        canvas.calcOffset();
        canvas.renderAll();
    }

    $('#voorKant').click(function(){
        canvas = voorkantcanvas;
        voorkant.parent().css('display' ,'block');
        binnenkant.parent().css('display' ,'none');
        envelop.parent().css('display' ,'none');
        canvas.calcOffset();
        canvas.renderAll();
    });

    $('#binnenKant').click(function(){
        canvas = binnenkantcanvas;
        binnenkant.parent().css('display' ,'block');
        voorkant.parent().css('display' ,'none');
        envelop.parent().css('display' ,'none');
        canvas.calcOffset();
        canvas.renderAll();
    });

    $('#envelop').click(function(){
        canvas = envelopcanvas;
        envelop.parent().css('display' ,'block');
        binnenkant.parent().css('display' ,'none');
        voorkant.parent().css('display' ,'none');
        canvas.calcOffset();
        canvas.renderAll();
    });

    /**
     * Haal het canvas op als json.
     * @return {*} het canvas als json.
     */
    this.getJSON = function () {
        var template = {
            "private": "true",
            "categorie": "samenwonen",
            "voorkant": JSON.stringify(voorkantcanvas),
            "binnenkant": JSON.stringify(binnenkantcanvas),
            "envelop":JSON.stringify(envelopcanvas),
            "template":voorkantcanvas.toDataURL("image/png")
        }
        console.log(template);
        return template;
    }

    // Onclick functies van bold, italic en underline.
    $('#bold').click(function(e){setBold(this);});
    $('#italic').click(function(e){setItalic(this);});
    $('#underline').click(function(e){ setUnderline(this);});
    $('#prullenbak').click(function(e){ removeObject(this);});
    $('#plus').click(function(e){ addText2(askText());});
    $('#bringToFront').click(function(e){ bringToFront(this);});
    $('#bringToBack').click(function(e){ sendToBack(this);});

    // Onclick functies van alignLeft, alignCenter en AlignRight
    $('#align1').click(function() {setAlign('left', tekstMarge,this);});
    $('#align2').click(function() {setAlign('center', canvas.width/2,this);});
    $('#align3').click(function() {setAlign('right', canvas.width-tekstMarge,this);});

    //verander cursor
    $('.tabs > li').hover(function() {$(this).css('cursor','pointer');}); //handje
    $('.tabscontent div img').hover(function() {$(this).css('cursor','pointer');}); //handje
    $('.tabscontent input').hover(function() {$(this).css('cursor','pointer');}); //handje
    $('.knop').hover(function() {$(this).css('cursor','pointer');}); //handje
    $('.tabscontent div label').hover(function() {$(this).css('cursor','default');}); //default
    $('#picker').hover(function() {$(this).css('cursor','crosshair');}); //kruisje

    /**
     * De tekst die geselecteerd is mag niet worden vergroot
     */
    canvas.on('object:selected', function(options) {
        if (options.target.type === "text") {
            options.target.lockScalingX = true;
            options.target.lockScalingY = true;
        }
    });

    /**
     * Tools menu.
     * Maak het tools menu voor de editor.
     */
    $('li').click(function (e) {
        TAB = this.id;
        e.preventDefault();
        if(TAB == "Bewerken1" || TAB == "Bewerken4") {
            $('#canvasPicker').show();
        }
        else {
            $('#canvasPicker').hide();
        }
        for(var i=1; i<5; i++) {
            var temp = "Bewerken"+i;
            var tab = document.getElementById("Bewerken"+i);
            var content = document.getElementById("tabpage_"+i);
            if(tab.id === TAB) {
                this.firstChild.src= "Content/images/tab"+i+"Select.png";
                content.style.display = "block";
            }
            else {
                tab.firstChild.src= "Content/images/tab"+i+".png";
                content.style.display = "none";
            }
        }
    });

    /**
     * Voeg een nieuw plaatje toe aan de kaart.
     * @param e event
     */
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
                    cornersize: 10,
                    height: berekenHoogte(image.height, image.width),
                    width: standaardImageBreedte
                });
                canvas.add(image);
                // end fabricJS stuff
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        canvas.calcOffset();
        canvas.renderAll();
    }

    /**
     * Bereken de hoogte bij de standaard breedte van een foto.
     * @param hoogte de hoogte van de foto.
     * @param breedte de breedte van de foto
     * @return {Number} de nieuwe hoogte van de foto
     */
    this.berekenHoogte = function(hoogte, breedte) {
        var percentageVerkleind = (standaardImageBreedte*100)/ breedte;
        hoogte = (hoogte*percentageVerkleind)/100;
        return hoogte;
    }

    /**
     * Voeg het achtergrondplaatje toe van de kaart (als overlay) en zet deze vast.
     */
    function addImageBackground() {
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

            binnenkantcanvas.add(image);
            image.sendToBack();
            image.lockMovementX = true;
            image.lockMovementY = true;
            image.lockRotation = true;
            image.lockUniScaling = true;
            image.selectable = false;
            // end fabricJS stuff
        }
        canvas.calcOffset();
        canvas.renderAll();
    }

    /**
     * Vraag de tekst om in het tekstobject te zetten.
     */
    this.askText = function () {
        var text = prompt("wat wilt u erin zetten?");
        addText2(text);
    }

    /**
     * Voeg een nieuw tekstobject toe aan de kaart.
     * @param ingevuldtxt de tekst.
     */
    function addText2(ingevuldtxt) {
        var text = new fabric.Text(ingevuldtxt, { left: 50, top: 100, fontSize: 20 });
        text.originX = "left";
        canvas.add(text);
    }

    /**
     * Verander de stijl van de tekst.
     * @param style De stijlsoort van de tekst
     * @param input De gekozen stijl
     * @param image het plaatje bij de stijl: geselecteerd/niet geselecteerd.
     */
    this.setChange = function (style, input, image) {
        var text = canvas.getActiveObject();
        if (text.type === "text") {
            if (text[style] == input) {
                text[style] = "normal";
                if (style != "fontStyle") {
                    image.src = "Content/images/" + input + ".png";
                }
            }
            else {
                text[style] = input;
                if (style !== "fontFamily") {
                    console.log(style);
                    image.src = "Content/images/" + input + "Select.png";
                }
            }
            canvas.calcOffset();
            canvas.renderAll();
        } else {
            alert("u moet eerst een tekst selecteren!!")
        }
    }

    /**
     * Zet de tekst op bold.
     * @param image het plaatje bold: geselecteerd/niet geselecteerd.
     */
    this.setBold = function (image) {
        setChange("fontWeight", "bold", image);
    }

    /**
     * Zet de tekst op italic.
     * @param image het plaatje italic: geselecteerd/niet geselecteerd.
     */
    this.setItalic = function (image) {
        setChange("fontStyle", "italic", image);
    }

    /**
     * Onderstreep de tekst.
     * @param image het plaatje onderstreept: geselecteerd/niet geselecteerd.
     */
    this.setUnderline = function (image) {
        setChange("textDecoration", "underline", image);
    }

    /**
     * Zet het juiste plaatje bij de gekozen alignment.
     * @param image het plaatje alignment: geselecteerd/niet geselecteerd.
     */
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

    /**
     * Verander de positionering van de tekst.
     * Align links, midden of rechts van de kaart
     * @param kant aan welke kant er aligned moet worden.
     * @param marge De afstand vanaf de rand van de kaart.
     * @param image Het plaatje bij de align positie.
     */
    this.setAlign = function (kant, marge, image) {
        var objectSelected = canvas.getActiveObject();
        if (objectSelected) {
            objectSelected.originX = kant;
            objectSelected.left = marge;
            setImagesAlign(image);
        }
        canvas.calcOffset();
        canvas.renderAll();
    }

    /**
     * De colorpicker.
     * Hiermee wordt de kleur voor de achtergrond of object gekozen.
     */
    function colorpicker() {
        var c = document.getElementById("picker");
        var ctx = c.getContext('2d');
        var image = new Image();
        image.src = "Content/images/colorwheel.png";

        image.onload = function () {
            ctx.drawImage(image, 1, 1)
        }

        function geefKleur(e) {
            //cordinaten van momentele positie
            var canvasOffset = $(c).offset();
            var canvasX = Math.floor(e.pageX - canvasOffset.left);
            var canvasY = Math.floor(e.pageY - canvasOffset.top);
            //momenteel pixel (rgba in array)
            var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
            var pixel = imageData.data;
            //rgb
            var kleurPixel = "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
            return kleurPixel;
        }

        //hier kies je een kleur eventhandler
        $('#picker').click(function (e) {
            var kleurPixel = geefKleur(e);
            console.log(kleurPixel)
            if (TAB == "Bewerken1") {
                console.log(TAB);
                if (canvas.getActiveObject() && canvas.getActiveObject().type === "text") {
                    console.log("text object selected");
                    kleurtext(canvas.getActiveObject(), kleurPixel);
                } else {
                    console.log("no text object selected");
                }
            }
            else if (TAB == "Bewerken4") {
                vulKleur(kleurPixel);
            }
            canvas.calcOffset();
            canvas.renderAll(); })
    }

    /**
     * Verander het achtergrond plaatje en verwijder de achtergrondkleur.
     */
    this.achtergrondImage = function () {
        var image = prompt("kies een ahtergrond image url");
        canvas.setBackgroundImage(image, function () {
            if (image[1] != null) {
                canvas.backgroundColor = 'none';
            }
            canvas.calcOffset();
            canvas.renderAll();
        });
    }

    /**
     * Verander de kleur van de achtergrond en verwijder het achtergrondplaatje.
     * @param kleur de kleur van de achtergrond
     */
    var vulKleur = function (kleur) {
        if (canvas.backgroundImage) {
            canvas.backgroundImage = 'none';
        }
        canvas.backgroundColor = kleur;
        canvas.calcOffset();
        canvas.renderAll();
    }

    /**
     * Verander de kleur van de tekst
     * @param text
     * @param kleur de kleur van de tekst
     */
    var kleurtext = function (text, kleur) {
        text.fill = kleur;
        canvas.calcOffset();
        canvas.renderAll();
    }

    /**
     * Wijzig de tekst van het geselecteerde tekst object wanneer er getyped wordt.
     */
    $(document).keydown(function (e) {
        var keyPressed = String.fromCharCode(e.which);
        var text = canvas.getActiveObject();
        if (text) {
//            var oudeKleur = text.fill;
//            text.fill = "rgb(255,0,0)";
            var newText = '';
            var stillTyping = true;
            if (e.which == 27) { //27 = esc
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
                else if (e.which == 13) { //13 = enter
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
            canvas.calcOffset();
            canvas.renderAll();

            if (!stillTyping) {
                this.text.originalText = null;
            }
        }
//        text.fill = oudeKleur;
        canvas.calcOffset();
        canvas.renderAll();
    });

    /**
     * Reset het canvas.
     */
    this.reset = function () {
        canvas.clear();
    }

    /**
     * Verwijder geselecteerde object.
     */
    this.removeObject = function () {
        var objectSelected = canvas.getActiveObject();
        canvas.remove(objectSelected);
    }

    /**
     * Haal het geselecteerde object naar voren.
     */
    this.bringToFront = function () {
        var objectSelected = canvas.getActiveObject();
        objectSelected.bringToFront();
    }

    /**
     * Zet het geselecteerde object naar achteren.
     */
    this.sendToBack= function(){
        var objectSelected = canvas.getActiveObject();
        objectSelected.sendToBack();
    }

    /**
     * Zet de tekstgrootte van de geselecteerde tekst.
     */
        document.getElementById('tekstSlider').onchange = function () {
            var value = this.value;
            var selectedObject = canvas.getActiveObject();
            if (selectedObject.type === "text") {
                selectedObject.fontSize = value;
                canvas.calcOffset();
                canvas.renderAll();
            }
        }

        /**
         * Zet de transparantie van het geselecteerde plaatje.
         * Moet niet werken bij tekst.
         */
        document.getElementById('transSlider').onchange = function () {
            var value = this.value / 100;
            var objectSelected = canvas.getActiveObject();
            if (objectSelected.type === "image") {
                objectSelected.setOpacity(value);
                canvas.calcOffset();
                canvas.renderAll();
            }
        }
        /**
         * Zet de brightness van het geselecteerde plaatje.
         * Moet niet werken bij tekst.
         */
        document.getElementById('brightnessSlider').onchange = function () {
            var value = parseInt(this.value);
            var objectSelected = canvas.getActiveObject();
            if (objectSelected.type === "image") {
                if (!objectSelected.filters[0]) {
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
        document.getElementById('tint').onchange = function () {
            console.log("nog niet gemaakt");
            var value = parseInt(this.value);
            var objectSelected = canvas.getActiveObject();
            if (objectSelected.type === "image") {
//        if(!objectSelected.filters[1]) {
//            objectSelected.filters.push(new fabric.Image.filters.Tint({ color: '00FF00'}));
//        }
//        else {
//            objectSelected.filters[1]['tint'] = 'rgb(255,0,0)';
//        }
//        objectSelected.applyFilters(canvas.renderAll.bind(canvas));
            }
        }

        document.getElementById('blur').onchange = function() {
            var value = parseInt(this.value);
            var objectSelected = canvas.getActiveObject();
            if(objectSelected.type === "image") {
                //?
            }
        }


    $('#combo').click(function (e) {
        var text = canvas.getActiveObject();
        if (text) {
            this.setFont = function () {
                var combobox = document.getElementById("combo");
                var selected = combobox.options[combobox.selectedIndex].text;
                setChange("fontFamily", selected);
            }
        }
        else {
            alert("u moet eerst een tekst selecteren!!");
        }
        canvas.calcOffset();
        canvas.renderAll();
    });

    this.loadTemplate = function(data){
        canvas.loadFromJSON(data.voorkant);
        binnenkantcanvas.loadFromJSON(data.binnenkant);
        envelopcanvas.loadFromJSON(data.envelop);
        canvas.renderAll();
        binnenkantcanvas.renderAll();
        envelopcanvas.renderAll();
    }
}

