function editor() {
//    "use strict";
    var BrightnessOn = false,
        GrayscaleOn = false,
        SepiaOn = false,
        EnvelopOn = false,
        currentIcoon,
        imagesOnCanvas =[],
        imagesOnCanvasDouble=[],
        images = [
            "Content/images/icons/plaatje01.png",
            "Content/images/icons/plaatje02.png",
            "Content/images/icons/plaatje03.png",
            "Content/images/icons/plaatje04.png",
            "Content/images/icons/plaatje05.png",
            "Content/images/icons/plaatje06.png",
            "Content/images/icons/plaatje07.png",
            "Content/images/icons/plaatje08.png",
            "Content/images/icons/plaatje09.png",
            "Content/images/icons/plaatje10.png",
            "Content/images/icons/plaatje11.png",
            "Content/images/icons/plaatje12.png",
            "Content/images/icons/plaatje13.png",
            "Content/images/icons/plaatje14.png",
            "Content/images/icons/plaatje15.png",
            "Content/images/icons/plaatje16.png",
            "Content/images/icons/plaatje17.png",
            "Content/images/icons/plaatje18.png",
            "Content/images/icons/plaatje19.png",
            "Content/images/icons/plaatje20.png",
            "Content/images/icons/plaatje21.png",
            "Content/images/icons/plaatje22.png"
        ],
        canvas = null,
        TAB = "Bewerken1",
        voorkantcanvas = new fabric.Canvas('canvas'),
        middelsteCanvas = new fabric.Canvas(getMiddelsteCanvas()),
        envelopcanvas = new fabric.Canvas('envelopcanvas'),
        voorkant = $("#canvas"),
        middelste = getMiddelste(),
        envelop = $("#envelopcanvas"),
        tekstMarge = 50,
        standaardImageBreedte = 200;

    setHidden();
    colorpicker();
    maakGallery();
    addText2("Vul hier je tekst in...");

    if (middelsteCanvas.type == "binnenkant") {
        addImageBackground();
    }

    function getMiddelste() {
        var m = null;
        if (localStorage.enkel == "dubbel") {
            middelsteCanvas.type = "binnenkant";
            m =  $("#binnenkantcanvas");
        }
        else if (localStorage.enkel == "enkel") {
            middelsteCanvas.type = "achterkant";
            m = $("#achterkantcanvas");
        }
        return m;
    }

    function getMiddelsteCanvas() {
        var m = null;
        if (localStorage.enkel == "dubbel") {
            m = "binnenkantcanvas"
        }
        else if (localStorage.enkel == "enkel") {
            m = "achterkantcanvas"
        }
        return m;
    }

    function setHidden() {
        canvas = voorkantcanvas;
        voorkant.parent().css('margin-right', '325px');
        middelste.parent().css('display' ,'none');
        envelop.parent().css('display' ,'none');
        canvas.calcOffset();
        canvas.renderAll();
    }

    $('#voorKant').click(function() {
        canvas = voorkantcanvas;
        voorkant.parent().css('display' ,'block');
        middelste.parent().css('display' ,'none');
        envelop.parent().css('display' ,'none');

        canvas.calcOffset();
        canvas.renderAll();
        if(EnvelopOn == true){
            EnvelopOn=false;
            setDisplayKaart();
        }
    });

    $('#binnenKant, #achterKant').click(function() {
        canvas = middelsteCanvas;
        middelste.parent().css('display' ,'block');
        voorkant.parent().css('display' ,'none');
        envelop.parent().css('display' ,'none');
        canvas.calcOffset();
        canvas.renderAll();
        if(EnvelopOn == true) {
            EnvelopOn=false;
            setDisplayKaart();
        }
    });

    $('#envelop').click(function() {
        canvas = envelopcanvas;
        envelop.parent().css('display' ,'block');
        middelste.parent().css('display' ,'none');
        voorkant.parent().css('display' ,'none');
        canvas.calcOffset();
        canvas.renderAll();
        EnvelopOn=true;
        setDisplayEnvelop();
    });

    /**
     * Haal het canvas op als json.
     * @return {*} het canvas als json.
     */
    this.getJSON = function() {
        var template = {
            "private": "true",
            "positie": localStorage.positie,
            "categorie": localStorage.categorie,
            "voorkant": JSON.stringify(voorkantcanvas),
            "midden": JSON.stringify(middelsteCanvas),
            "envelop":JSON.stringify(envelopcanvas),
            "templatePng":voorkantcanvas.toDataURL("image/png"),
            "middenPng": middelsteCanvas.toDataURL("image/png"),
            "achterkantPng":envelopcanvas.toDataURL("image/png")
        }
        console.log(template);
        return template;
    }

    /**
     * Haal het canvas op als json.
     * @return {*} het canvas als json.
     */
    this.getJSONTemplate = function() {
        var template = {
            "private": "false",
            "positie": localStorage.positie,
            "categorie": localStorage.categorie,
            "voorkant": JSON.stringify(voorkantcanvas),
            "templatePng":voorkantcanvas.toDataURL("image/png")
        }
        console.log(template);
        return template;
    }

    this.getPositie = function() {
        if (!localStorage.positie) {
            localStorage.positie = prompt("geen positie gekozen. Voer staand/liggend in voor de databse");
        }
        return localStorage.positie;
    }

    this.getCategorie = function() {
        if (!localStorage.categorie) {
            localStorage.categorie = prompt("geen categorie gekozen. Voer samenwonen/verhuizen/housewarming in voor de databse");
        }
        return localStorage.categorie;
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
            options.target.set({
                borderColor: 'grey',
                cornerSize: 10,
                cornerColor: 'grey'
            });
        }
    });

    /**
     * Tools menu.
     * Maak het tools menu voor de editor.
     */
    $('li').click(function (e) {
        TAB = this.id;
        e.preventDefault();
        setVisibleTabAndPLus();
        for(var i=1; i<6; i++) {
            var temp = "Bewerken"+i;
            var tab = document.getElementById("Bewerken"+i);
            var content = document.getElementById("tabpage_"+i);
            if(tab.id === TAB) {
                this.firstChild.src= "Content/images/tab"+i+"Select.png";
                content.style.display = "block";
            }
            else {
                if(tab.id != "Bewerken5") {
                    tab.firstChild.src= "Content/images/tab"+i+".png";
                } else {
                    tab.style.display="none";
                }
                content.style.display = "none";
            }
        }
    });

    function setDisplayEnvelop() {
        if(EnvelopOn == true) {
            TAB = 'Bewerken5';
            setVisibleTabAndPLus();
            for(var i=1; i<6; i++) {
                var tab = document.getElementById("Bewerken"+i);
                var content = document.getElementById("tabpage_"+i);
                if(tab.id === TAB) {
                    content.style.display = "block";
                    tab.style.display = "block"
                }
                else {
                    content.style.display = "none";
                    tab.style.display = "none";
                }
            }
        }
    }
    function setDisplayKaart() {
        if(EnvelopOn == false) {
            TAB="Bewerken1";
            for(var i=1; i<6; i++) {
                var tab = document.getElementById("Bewerken"+i);
                var content = document.getElementById("tabpage_"+i);
                if(tab.id === TAB) {
                    content.style.display = "block";
                    tab.style.display = "block"
                    tab.firstChild.src= "Content/images/tab"+i+"Select.png";
                }
                else {

                    if(tab.id != "Bewerken5") {
                        tab.style.display = "block";
                        tab.firstChild.src= "Content/images/tab"+i+".png";
                    }
                    else{
                        tab.style.display = "none";
                    }
                    content.style.display = "none";

                }
            }
            setVisibleTabAndPLus();
        }
    }
    function setVisibleTabAndPLus() {
        if (TAB === "Bewerken1" || TAB === "Bewerken4" || TAB === "Bewerken5") {
            $('#canvasPicker').show();

        }
        else {
            $('#canvasPicker').hide();
        }

        if (TAB == "Bewerken1") {
            $('#plus').show();
        }
        else {
            $('#plus').hide();
        }
    }
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
        var image = new fabric.Image(imgObj);
        var shadowcard = "shadowcard.png";
        var posleft = 325;
        var postop = 250;

        if (localStorage.positie === "liggend") {
            shadowcard = "shadowcard.png";
            posleft = 325;
            postop = 250;
        }
        else if (localStorage.positie === "staand") {
            shadowcard = "shadowcard2.png";
            posleft = 250;
            postop = 325;
        }
        imgObj.src = "Content/images/" + shadowcard;
        imgObj.onload = function () {
            image.set({
                left: posleft,
                top: postop,
                angle: 0,
                padding: 10,
                cornersize: 10
            });
        }
        middelsteCanvas.add(image);
        image.sendToBack();
        image.lockMovementX = true;
        image.lockMovementY = true;
        image.lockRotation = true;
        image.lockUniScaling = true;
        image.selectable = false;
        // end fabricJS stuff
        canvas.calcOffset();
        canvas.renderAll();
    }

    function addImageToCanvas(src) {
        var imgObj = new Image();
        imgObj.src = src;
        imgObj.onload = function () {
            // start fabricJS stuff
            var image = new fabric.Image(imgObj);
            image.set({
                left: 100,
                top: 350,
                angle: 0,
                padding: 10,
                cornersize: 10
            });
            if(EnvelopOn == true) {
                canvas.objects
                image.lockMovementX = true;
                image.lockMovementY = true;
                image.lockRotation = true;
                image.selectable = false;
                currentIcoon = image;
            }
            canvas.add(image);

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
                if (style != "fontFamily") {
                    image.src = "Content/images/" + input + ".png";
                }
            }
            else {
                text[style] = input;
                if (style !== "fontFamily") {
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
    function setButtonImages(image) {
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
        if (objectSelected.type = "text") {
            objectSelected.textAlign = kant;
//            objectSelected.originX = kant;
//            objectSelected.left = marge;
            setButtonImages(image);
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
            if (TAB == "Bewerken1") {
                if (canvas.getActiveObject() && canvas.getActiveObject().type === "text") {
                    console.log("text object selected");
                    kleurtext(canvas.getActiveObject(), kleurPixel);
                } else {
                    console.log("no text object selected");
                }
            }
            else if (TAB == "Bewerken4" || TAB == "Bewerken5") {
                vulKleur(kleurPixel);
            }
            canvas.calcOffset();
            canvas.renderAll(); })
    }

    /**
     * Verander het achtergrond plaatje en verwijder de achtergrondkleur.
     */
    document.getElementById('achtergrondImage').onchange = function handleImage(e) {
        checkBackgroundColorenImage();
        alert("cleared")
        var reader = new FileReader();
        var url;
        reader.onload = function (event) { console.log('fdsf');
            alert("upload")
            var imgObj = new Image();
            imgObj.src = event.target.result;
            var image = new fabric.Image(imgObj);


            imgObj.onload = function () {

                image.set({
                    left: 0,
                    top: 0



                });
                // start fabricJS stuff
            }

            canvas.setBackgroundImage(image.toDataURL(),function() {
                canvas.renderAll.bind(canvas);
                canvas.renderAll();
            });
        }

        // end fabricJS stuff
        reader.readAsDataURL(e.target.files[0]);
        canvas.calcOffset();
        canvas.renderAll();


    }

    function checkBackgroundColorenImage(){
        if (canvas.backgroundImage) {
            canvas.backgroundImage = 'none';
            console.log(canvas.backgroundImage)
        }

        if(canvas.backgroundColor){
            canvas.backgroundColor = 'none'
            canvas.calcOffset();
            canvas.renderAll();
            console.log("color" +canvas.backgroundColor)
        }
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

    $(document)
        .on('keypress', function (e) {
            var code = (e.keyCode|| e.which);
            var keyPressed = String.fromCharCode(code);
            console.log("keypress: " + e.which);
            var text = canvas.getActiveObject();
            if (text) {
                var newText = '';
                var stillTyping = true;
                if (!text.originalText) {//Store the original text before beginning to type
                    text.originalText = text.text;
                }
                else if (code == 13) { //13 = enter
                    newText = text.text + "\n";
                    stillTyping = true;
                }
                else if ((keyPressed.match(/^[a-zA-Z0-9!&()"',\.?\-_@#$%^&*:;{} ]/))) {  //allowed chars
                    if (text.text == text.originalText) {
                        text.text = '';
                    }
                    newText = text.text + keyPressed;
                }
                text.set({ text: newText }); //Change the text
                canvas.calcOffset();
                canvas.renderAll();
                if (!stillTyping) {
                    this.text.originalText = null;
                }
            }
        })
        .on('keydown', function(e) {
            var code = (e.keyCode|| e.which);
//            e.preventDefault();
            console.log("keydown: " + e.keyCode);
            var text = canvas.getActiveObject();
            if (text) {
                var newText = '';
                var stillTyping = true;
                if (!text.originalText) {//Store the original text before beginning to type
                    text.originalText = text.text;
                }
                else if (code === 8) {//8 = backspace
                    e.preventDefault();
                    newText = text.text.substr(0, text.text.length - 1);
                    text.set({ text: newText }); //Change the text
                }
                //if the user wants to remove all text, or the element entirely
                else if (code === 46) { // 46 = delete
                    text.remove(true);
                    return;
                }
                canvas.calcOffset();
                canvas.renderAll();
                if (!stillTyping) {
                    this.text.originalText = null;
                }
            }
        });

    /**
     * Reset het canvas.
     */
    function reset () {
        canvas.clear();
    }

    /**
     * Verwijder geselecteerde object.
     */
    this.removeObject = function () {
        var objectSelected = canvas.getActiveObject();
        var doubleObject = false;
        if(objectSelected.type === "image") {
            var ObjectSrc =  objectSelected._element.src.split("/").pop();
            for(var i = 0; i<imagesOnCanvas.length;i++) {
                var ImagesSrc = imagesOnCanvas[i];
                if(ObjectSrc === ImagesSrc){
                    for(var j = 0 ; j<imagesOnCanvasDouble.length; j++){
                        if(ObjectSrc === imagesOnCanvasDouble[j]) {
                            doubleObject = true;
                            imagesOnCanvasDouble.splice(j,1);
                            j = imagesOnCanvasDouble.length+1;
                        }

                    }
                    if(doubleObject === false){
                        imagesOnCanvas.splice(i,1)
                        envelopcanvas.clear();
                        alert("clear!!");
                        maakGalleryGebruikteIconen();
                    }
                }
            }
            doubleObject = false;
        }
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
    this.sendToBack= function() {
        var objectSelected = canvas.getActiveObject();
        objectSelected.sendToBack();
    }

    /**
     * Zet de tekstgrootte van de geselecteerde tekst.
     */
    document.getElementById('tekstSlider').onchange = function() {
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
    document.getElementById('transSlider').onchange = function() {
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
    document.getElementById('brightnessSlider').onchange = function() {
        var value = parseInt(this.value);
        var objectSelected = canvas.getActiveObject();
        if (objectSelected.type === "image") {
            if(BrightnessOn == true){
                for (var i=0;i<objectSelected.filters.length; i++)
                {
                    if(objectSelected.filters[i].type == "Brightness") {
                        objectSelected.filters[i]['brightness'] = value;
                    }
                }
            }
            if(BrightnessOn == false) {
                objectSelected.filters.push(new fabric.Image.filters.Brightness({ brightness: value }));
                BrightnessOn=true;
            }
            objectSelected.applyFilters(canvas.renderAll.bind(canvas));
        }
    }

    /**
     * Zet de tint van het geselecteerde plaatje.
     * Moet niet werken bij tekst.
     */
    document.getElementById('tint').onchange = function() {
        var value = parseInt(this.value);
        var objectSelected = canvas.getActiveObject();
        if (objectSelected.type === "image") {
            if(value == 0) {
                for (var i=0;i<objectSelected.filters.length; i++)
                {
                    if(objectSelected.filters[i].type == "Sepia") {
                        objectSelected.filters.splice(i,1);
                        SepiaOn=false;
                    }
                }
            }
            else {
                objectSelected.filters.push(new fabric.Image.filters.Sepia(value));
                SepiaOn=true;
            }
            objectSelected.applyFilters(canvas.renderAll.bind(canvas));
        }
    }

    document.getElementById('contrast').onchange = function() {
        var value = parseInt(this.value);
        var objectSelected = canvas.getActiveObject();

        if (objectSelected.type === "image") {
            if(value == 0){
                for (var i=0;i<objectSelected.filters.length; i++) {
                    if(objectSelected.filters[i].type == "Grayscale") {
                        objectSelected.filters.splice(i,1);
                        GrayscaleOn=false;
                    }
                }
            }
            else {
                objectSelected.filters.push(new fabric.Image.filters.Grayscale);
                GrayscaleOn=true;
            }
            objectSelected.applyFilters(canvas.renderAll.bind(canvas));
        }
    }


    $('#combo').click(function (e) {
        var text = canvas.getActiveObject();
        if (text) {
            this.setFont = function() {
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

    this.loadTemplate = function(data) {
        canvas.loadFromJSON(data.voorkant);
        middelsteCanvas.loadFromJSON(data.midden);
        envelopcanvas.loadFromJSON(data.envelop);
        canvas.renderAll();
        middelsteCanvas.renderAll();
        envelopcanvas.renderAll();
    }

    this.loadTemplatePubliek = function(data) {
        canvas.loadFromJSON(data.voorkant);
        canvas.renderAll();
    }

    /**
     * De functie TemplateGekozen is bedoeld om de array imagesOnCanvas en imagesOnCanvasDouble up to daten.
     * Deze functie wordt opgeroepen wanneer je een template hebt gekozen. De bedoeling van deze functie is om achter te komen welke iconnen er zijn gebruikt en of ze vaker zijn gebruikt.
     * Als eerst krijg je de data mee die de editorcontroller binnen krijgt wanneer hij de service oproept om data op te halen.
     * @param data
     * @constructor
     */
    this.TemplateGekozen = function(data){
        var response = JSON.parse(data.voorkant);
        for(var i = 0; i <response.objects.length; i++){
            if(response.objects[i].type === "image"){
                var currentImage = response.objects[i].src.split("/").pop();
                for(var j = 0 ; j<images.length; j++) {
                    if(currentImage === images[j].split("/").pop()) {
                        setIcoonsUsed(currentImage);
                    }
                }
            }
        }
    };

    /**
     * De functie setIcoonsUsed is bedoeld om bij te houden welke icoons je gebruikt op de kaart(canvas) en of ze vaker worden gebruikt.
     * Deze functie wordt gebruikt bij maakGallery en TemplateGekozen.
     * In de maakGallery wordt hij gebruikt wanneer je op een img klikt, want dan wordt hij toegevoegd aan de canvas en wordt deze ales een imagesOnCanvas opgeslagen.
     * Hetzelfde geld eigenlij voor TemplateGekozen alleen bestaan de icoons al op de template,
     * Wanneer je een template laad moet je ook van te voren weten welke icoontje er zijn op de canvas en deze in de array imagesOnCanvas zetten,
     * wanneer er icoons vaker in voorkomen worden deze in de array imagesOnCanvasDouble gezet.
     * Wat hij eerst gaat checken is of de array leeg is, indien dit het geval is wordt de image gepushed in de imagesOnCanvas array.
     * Wanneer er al images in de array zitten zet je eerst de icoonDubbel op false, dan gaat hij door een loop om te kijken of de image waar je op heb geklikt in de array van imagesOnCanvas voorkomt.
     * Indien de image ook in de array zit wordt deze gepushed in de array imagesOnCanvasDouble, hier worden de images die vaker voorkomen opgeslagen.
     * Je set de icoonDubbel op true en deze functie is afgelopen.
     * Indien een image niet dubbel is blijft de icoonDubbel op false en pusht hij de currentImage in de imagesOnCanvas array want hij komt dan niet vaker voor;
     * De  k = imagesOnCanvas.length +  is bedoelt om uit de loop de komen zodat hij het niet helemaal moet uitvoeren wanneer hij al weet dat de image dubbel is.
     * Nadat hij vast heeft gesteld of een image dubbel is en heeft gepusht wordt de functie maakGalleryGebruikteIconen opgeroepen om de gupdate gallery te maken voor de envelop.
     * @param currentImage De image waar je op hebt geklikt (of deze op de template al staat nadat je een template hebt gekozen) die op de canvas komt.
     */
    function setIcoonsUsed(currentImage) {
        if (imagesOnCanvas.length != 0) {
            var icoonDubbel = false;
            for (var k = 0; k < imagesOnCanvas.length; k++) {
                if (currentImage == imagesOnCanvas[k]) {
                    icoonDubbel = true;
                    imagesOnCanvasDouble.push(currentImage);
                    k = imagesOnCanvas.length + 1;
                }
            }
            if (icoonDubbel == false) {
                imagesOnCanvas.push(currentImage);
            }
        }
        else {
            imagesOnCanvas.push(currentImage);
        }
        maakGalleryGebruikteIconen();
    }

    /**
     * De functie maakGallery is bedoeld om een gallery te maken van de iconen die je op een kaart kunt zetten.
     * Als eerst haalt hij de div iconGallery op en dan gaat hij door een loop.
     * In de loop maakt hij een img aan en geeft de src mee van de images(icons) die je kunt gebruiken.
     * Hij zet dit in de iconGallery, dan komt er een eventhandler wanneer je op de img klikt.
     * Wanneer je op de icon(img) klikt in de iconGallery wordt deze toegevoegd aan de canvas d.m.v. de functie addImageToCanvas en je geeft de src van de image mee.
     * Dan wordt de functie setIcoonUsed opgeroepen en je geeft alleen de naam van de image mee( hij split de src en neemt de laatste string).
     */
    function maakGallery() {
        var iconGallery = document.getElementById("iconGallery");
        for (var i = 0; i < images.length; i++) {
            var img = document.createElement("img");
            img.src = images[i];
            iconGallery.appendChild(img);
            img.onclick = function() {
                addImageToCanvas(this.src);
                setIcoonsUsed(this.src.split("/").pop());
            };

        }
    };

    /**
     * De functie maakGalleryGebruikteIconen is bedoeld om een gallery te maken voor de iconen die je gebruikt bij de kaart,
     * Deze gallery wordt gemaakt wanneer je een icoon add op de kaart of een icoon verwijdert.
     * Het eerste wat hij doet nadat een functie add of remove is opgeroepen is de oude gallery verwijderen en dan een nieuwe erin zetten, dit gebeurd met de methode cleanGallery.
     * Deze gallery bij de tab envelop wordt weergegeven wanneer je de envelop wil bewerken.
     * wanneer je de op de envelop een icoon wil gebruiken ga je dus naar de envelop, daar zie je de gallery van alle gebruikte iconen.
     * Wanneer je op een icoon klikt reset hij de canvas en zet dan pas de image op de canvas.
     * De icoon heeft een vaste plaats en je kan er niks mee doen.
     */
    function maakGalleryGebruikteIconen() {
        var gallery = clearGallery();
        for (var i = 0; i < imagesOnCanvas.length; i++) {
            var img = document.createElement("img");
            img.src = "Content/images/icons/"+imagesOnCanvas[i];
            img.alt = ""+imagesOnCanvas[i];
            gallery.appendChild(img);
            img.onclick = function(e) {
                reset();
                addImageToCanvas(this.src);
            };
        }
    };

    /**
     * dit is de functie clearGallery, hij haalt eerst de div waar alle iconen van de envelop zitten op.
     * Dan kjkt hij of er iets in de div is, indien dit het geval is verwijdert hij de firtchild element zolang er 1 is.
     * Deze functie wordt gebruikt voor het maken can de gallery iconen voor de envelop, omdat hij vaak geupdate wordt.
     * @return {HTMLElement} : hij returnt de lege div "iconGalleryGebrikt" voor de envelop.
     */
    function clearGallery() {
        var gallery = document.getElementById("iconGalleryGebruikt");
        if(gallery.childElementCount != 0) {
            while (gallery.firstChild) {
                gallery.removeChild(gallery.firstChild);
            }
        }
        return gallery;
    };
}