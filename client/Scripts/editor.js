function editor() {
//    "use strict";
    /**
     * De brigntessOn, GrayscaleOn, SepiaOn zijn allemaal bedoeld om te zien of er een filter op een foto zit.
     * @type {Boolean} : boolean of er wel of niet een filter zit
     */
    var BrightnessOn = false,
        GrayscaleOn = false,
        SepiaOn = false,
        /**
         * Als je op de envelop zit om die te kunenn aanpassen
         * @type {Boolean} : Boolean om te zien of je de canvas envelop hebt
         */
            EnvelopOn = false,
        /**
         * De icoon die je gebruikt bij de envelop.
         * @type {Object} : image object
         */
            currentIcoon,
        /**
         * imagesOnCanvas is een array met alle images die je hebt geadd op de canvas
         * imagesOnCanvasDouble is een array met alle images die vaker voorkomen op de canvas.
         * @type {Array} : een array met gebruikte iconen op canvas.
         */
            imagesOnCanvas =[],
        imagesOnCanvasDouble=[],
        /**
         * images is een array met alle iconen src erin
         * @type {Array} : een array met iconen die je kunt gebruiken op de canvas.
         */
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
        /**
         * De canvas waar je op wil editen (current canvas)
         * @type {Canvas} : De canvas waarom je wil werken
         */
            canvas = null,
        /**
         * De tab waar je op staat
         * @type {String} : De tab waar je op hebt geklikt, default begin tekst tab.
         */
            TAB = "Bewerken1",
        /**
         * voorkantcanvas, middelstecanvas en envelopcanvas zijn de nieuwe fabric canvassen die worden gemaakt aan het begin.
         * @type {Object} : Fabric Canvas aangemaakt.
         */
            voorkantcanvas = new fabric.Canvas('canvas'),
        middelsteCanvas = new fabric.Canvas(getMiddelsteCanvas()),
        envelopcanvas = new fabric.Canvas('envelopcanvas'),
        /**
         * De link naar de id van de canvassen ( De canvassen dus)
         * @type {Object} : specifieke Fabric Canvas.
         */
            voorkant = $("#canvas"),
        middelste = getMiddelste(),
        envelop = $("#envelopcanvas"),
        /**
         * Standaard breedte van image wanneer je hem inlaad.
         * @type {Integer} : standaard breedte.
         */
            standaardImageBreedte = 200;

    setHidden();
    colorpicker();
    maakGallery();
    addText2("Vul hier je tekst in...");
    setOnclick();
    changeCursor();

    /**
     * Controleer of de kaart dubbel is of enkel.
     * Wanneer het middelste canvas de binnenkant van de kaart is (ipv de achterkant),
     * komt hier een achtergrond plaatje te staan.
     * Hierdoor is te zien dat de kaart hier gevouwen kan worden/ dubbel is.
     * Selecteer het juiste middelste canvas element.
     *
     * @return {*} het middelste canvas element.
     */
    function getMiddelste() {
        var m = null;
        if (localStorage.enkel == "dubbel") {
            addImageBackground();
            m =  $("#binnenkantcanvas");
        }
        else if (localStorage.enkel == "enkel") {
            m = $("#achterkantcanvas");
        }
        return m;
    }

    /**
     * Controleer of de kaart dubbel is of enkel.
     *
     * @return {*} binnenkant of achterkant
     */
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

    /**
     * Zet de geselecteerde button op bold
     * @param button de geselecteerde button
     */
    function setBold(button) {
        $('#navKaart button').css('font-weight', 'normal');
        $(button).css('font-weight', 'bold');
    }

    /**
     * Zet alle kaart kanten, behalve de voorkant op onzichtbaar.
     * Wanneer de kaart geladen is, is de voorkant van de kaart als eerst in beeld.
     */
    function setHidden() {
        canvas = voorkantcanvas;
        $('#voorKant').css('font-weight', 'bold');
        voorkant.parent().css('margin-right', '325px');
        middelste.parent().css('display' ,'none');
        envelop.parent().css('display' ,'none');
        canvas.calcOffset();
        canvas.renderAll();
    }

    /**
     * Zet de voorkant van de kaart in beeld en verbergt de rest.
     */
    $('#voorKant').click(function() {
        canvas = voorkantcanvas;
        voorkant.parent().css('display' ,'block');
        middelste.parent().css('display' ,'none');
        envelop.parent().css('display' ,'none');
        canvas.calcOffset();
        canvas.renderAll();
        setBold(this);
        if(EnvelopOn == true){
            EnvelopOn=false;
            setDisplayKaart();
        }
    });

    /**
     * Zet de binnenkant of achterkant van de kaart in beeld en verbergt de rest.
     */
    $('#binnenKant, #achterKant').click(function() {
        canvas = middelsteCanvas;
        middelste.parent().css('display' ,'block');
        voorkant.parent().css('display' ,'none');
        envelop.parent().css('display' ,'none');
        canvas.calcOffset();
        canvas.renderAll();
        setBold(this);
        if(EnvelopOn == true) {
            EnvelopOn=false;
            setDisplayKaart();
        }
    });

    /**
     * Zet de envelop in beeld en verbergt de rest.
     */
    $('#envelop').click(function() {
        canvas = envelopcanvas;
        envelop.parent().css('display' ,'block');
        middelste.parent().css('display' ,'none');
        voorkant.parent().css('display' ,'none');
        canvas.calcOffset();
        canvas.renderAll();
        setBold(this);
        EnvelopOn=true;
        setDisplayEnvelop();
    });

    /**
     * Haal het canvas op als json.
     * Het kaart wordt hier opgeslagen als een privé kaart.
     * Alle kanten van de kaart worden hierin opgeslagen.
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
     * Het kaart wordt hier opgeslagen als een publieke kaart/ template.
     * Hier wordt geen midden kant of envelop opgeslagen.
     * Alleen de voorkant wordt gebruikt als template,
     * welke de gebruiker als een beginpunt kan gebruiken voor zijn/ haar ontwerp.
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

    /**
     * Hiermee worden de onclick events gezet op de editor tools.
     */
    function setOnclick() {
        $('#bold').click(function(e){setBold(this);});
        $('#italic').click(function(e){setItalic(this);});
        $('#underline').click(function(e){ setUnderline(this);});
        $('#prullenbak').click(function(e){ removeObject(this);});
        $('#plus').click(function(e){ addText2(askText());});
        $('#bringToFront').click(function(e){ bringToFront(this);});
        $('#bringToBack').click(function(e){ sendToBack(this);});
        $('#align1').click(function() {setAlign('left',this);});
        $('#align2').click(function() {setAlign('center',this);});
        $('#align3').click(function() {setAlign('right',this);});
    }

    /**
     * Verander de cursor bij onhover op bepaalde elementen.
     */
    function changeCursor() {
        $('.tabs > li').hover(function() {$(this).css('cursor','pointer');}); //handje
        $('.tabscontent div img').hover(function() {$(this).css('cursor','pointer');}); //handje
        $('.tabscontent input').hover(function() {$(this).css('cursor','pointer');}); //handje
        $('.knop').hover(function() {$(this).css('cursor','pointer');}); //handje
        $('.tabscontent div label').hover(function() {$(this).css('cursor','default');}); //default
        $('#picker').hover(function() {$(this).css('cursor','crosshair');}); //kruisje
    }

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
     * Deze functie is bedoel voor wanneer je op een tab klikt.
     * Maak het tools menu voor de editor. Wanneer je op een tab klikt set hij de goede display images en de goede content wordt weergegeven bij de tab/
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

    /**
     * Deze functie is bedoeld voor het zetten van de displays van de tabs en extra bewerk opties die naast de canvas zitten wanneer hij op een envelop zit.
     */
    function setDisplayEnvelop() {
        if(EnvelopOn == true) {
            TAB = 'Bewerken5';
            setVisibleTabAndPLus();
            var tabs;
            for(var tabs = 1; tabs < 6; tabs++) {
                var tab = document.getElementById("Bewerken" + tabs);
                var content = document.getElementById("tabpage_" + tabs);
                if (tab.id === TAB) {
                    content.style.display = "block";
                    tab.style.display = "block"
                }
                else {
                    content.style.display = "none";
                    tab.style.display = "none";
                }
            }
        }
    };

    /**
     * Deze functie is bedoeld voor het zetten van de displays van de tabs en extra bewerk opties die naast de canvas zitten wanneer hij niet op een envelop zit.
     *
     */
    function setDisplayKaart() {
        if (EnvelopOn === false) {
            TAB = "Bewerken1";
            for (var i = 1; i < 6; i++) {
                var tab = document.getElementById("Bewerken" + i);
                var content = document.getElementById("tabpage_" + i);
                if(tab.id === TAB) {
                    content.style.display = "block";
                    tab.style.display = "block"
                    tab.firstChild.src = "Content/images/tab"+i+"Select.png";
                } else {
                    if(tab.id != "Bewerken5") {
                        tab.style.display = "block";
                        tab.firstChild.src = "Content/images/tab" + i + ".png";
                    } else {
                        tab.style.display = "none";
                    }
                    content.style.display = "none";
                }
            }
            setVisibleTabAndPLus();
        }
    };

    /**
     * Deze functie set de display van de plusje voor tekst toevoegen en colorpicker.
     */
    function setVisibleTabAndPLus() {
        var canvaspicker = $('#canvasPicker');
        var plusje = $('#plus');
        if (TAB === "Bewerken1" || TAB === "Bewerken4" || TAB === "Bewerken5") {
            $('#canvasPicker').show();
        } else {
            canvaspicker.hide();
        }
        if (TAB == "Bewerken1") {
            plusje.show();
        } else {
            plusje.hide();
        }
    };

    /**
     * Deze functie voegt een nieuw plaatje toe aan de kaart.
     * Hij maakt van de gekozen image de src en maakt daarvan een fabric image set deze en voegt het toe aan de canvas.
     * @param e event
     */
    document.getElementById('imgLoader').onchange = function handleImage(e) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function () {
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
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        canvas.calcOffset();
        canvas.renderAll();
    };

    /**
     * Deze functie berekent de hoogte bij de standaard breedte van een foto.
     * @param hoogte de hoogte van de foto.
     * @param breedte de breedte van de foto
     * @return {Number} de nieuwe hoogte van de foto
     */
    this.berekenHoogte = function(hoogte, breedte) {
        var percentageVerkleind = (standaardImageBreedte*100)/ breedte;
        hoogte = (hoogte*percentageVerkleind)/100;
        return hoogte;
    };

    /**
     * Voeg het achtergrondplaatje toe van de kaart (als overlay) en zet deze vast.
     * Dit moet alleen werken bij een dubbele kaart.
     */
    function addImageBackground() {
        var shadowcard = "shadowcard.png";
        var posleft;
        var postop;

        if (localStorage.enkel === "dubbel") {
            if (localStorage.positie === "liggend") {
                shadowcard = "shadowcard.png";
                posleft = 325;
                postop = 325;
            }
            else if (localStorage.positie === "staand") {
                shadowcard = "shadowcard2.png";
                posleft = 325;
                postop = 350;
            }
            var imgObj = new Image();
            imgObj.src = "Content/images/" + shadowcard;
            imgObj.onload = function () {
                var image = new fabric.Image(imgObj);
                image.set({
                    left: posleft,
                    top: postop,
                    angle: 90,
                    padding: 0,
                    cornersize: 10
                });
                middelsteCanvas.add(image);
                image.sendToBack();
                image.lockMovementX = true;
                image.lockMovementY = true;
                image.lockRotation = true;
                image.selectable = false;
            }
            middelsteCanvas.calcOffset();
            middelsteCanvas.renderAll();
        }
    }

    /**
     * Deze functie zet een image op de canvas.
     * Hij maakt eerst een image object aan,
     * wanneer deze is geladen maakt hij een fabric image aan en set de beginpositie.
     * Wanneer hij op een envelop wordt geplaats krijgt hij een vaste plaats en je kunt er niks mee doen.
     * @param src : image src waarvan een image  object van gemaakt moet worden.
     */
    function addImageToCanvas(src) {
        var imgObj = new Image();
        imgObj.src = src;
        imgObj.onload = function () {
            var image = new fabric.Image(imgObj);
            image.set({
                left: 100,
                top: 350,
                angle: 0,
                padding: 10,
                cornersize: 10
            });
            if(EnvelopOn == true) {
                image.lockMovementX = true;
                image.lockMovementY = true;
                image.lockRotation = true;
                image.selectable = false;
                currentIcoon = image;
            }
            canvas.add(image);
        }

        canvas.calcOffset();
        canvas.renderAll();
    };

    /**
     * Deze functie is om te vragen welke tekst hij wil zetten in de canvas.
     */
    this.askText = function () {
        var text = prompt("wat wilt u erin zetten?");
        addText2(text);
    };

    /**
     * Deze functie is om een nieuwe tekstobject toe te voegen aan de kaart.
     * @param ingevuldtxt de tekst.
     */
    function addText2(ingevuldtxt) {
        var text = new fabric.Text(ingevuldtxt, { left: 50, top: 100, fontSize: 20 });
        text.originX = "left";
        canvas.add(text);
    }

    /**
     * Deze functie is bedoelt om de stijl te veranderen van de tekst.
     * Wanneer de geselecteerde object tekst if moet hij kijken of de style gelijkt is aan te value (of het bv bold is)
     * Indien dat zo is verandert de stule in normal, de style geen fontfamily is zet je de img gewoon op bv bold.
     * Anders set je de style op de input, wanneer het geen fontfamily is zet je de src op selected image.
     * @param style De stijlsoort van de tekst
     * @param input De gekozen stijl
     * @param image het plaatje bij de stijl: geselecteerd/niet geselecteerd.
     */
    this.setChange = function (style, input, image) {
        var text = canvas.getActiveObject();
        if (text && text.type === "text") {
            if (text[style] === input) {
                text[style] = "normal";
                if (style !== "fontFamily") {
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
    };

    /**
     * Deze functie is bedoelt om de tekst op bold te zetten.
     * hiervoor wordt een algemene functie setChange opgeroepen waarbij je meegeeft wat je wil veranderen, naar wat je het wil veranderen en de image om te updaten.
     * @param image het plaatje bold: geselecteerd/niet geselecteerd.
     */
    this.setBold = function (image) {
        setChange("fontWeight", "bold", image);
    }

    /**
     * Deze functie is bedoelt om de tekst op italic te zetten.
     * hiervoor wordt een algemene functie setChange opgeroepen waarbij je meegeeft wat je wil veranderen, naar wat je het wil veranderen en de image om te updaten.
     * @param image het plaatje italic: geselecteerd/niet geselecteerd.
     */
    this.setItalic = function (image) {
        setChange("fontStyle", "italic", image);
    }

    /**
     * Deze functie is bedoelt om tekst te onderstepen,
     * hiervoor wordt een algemene functie setChange opgeroepen waarbij je meegeeft wat je wil veranderen, naar wat je het wil veranderen en de image om te updaten.
     * @param image het plaatje onderstreept: geselecteerd/niet geselecteerd.
     */
    this.setUnderline = function (image) {
        setChange("textDecoration", "underline", image);
    };

    /**
     * Deze functie is bedoelt om de img goed te zetten wanneer je op een align klikt.
     * Zet het juiste plaatje bij de gekozen alignment door een loop temaken en te checken of het id klopt met de align en deze en deze als een geselecteerde image te zetten.
     * Alle andere images worden "gedeselecteerd" zet de src terug
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
    };

    /**
     * Deze functie is bedoelt om de align te zetten van de tekst.
     * Align links, midden of rechts wanneer je meerdere lines hebt zie je dat en alleen als je een tekst object hebt geselecteerd
     * @param kant aan welke kant er aligned moet worden.
     * @param image Het plaatje bij de align positie die verandert moet worden.
     */
    this.setAlign = function (kant, image) {
        var objectSelected = canvas.getActiveObject();
        if (objectSelected && objectSelected.type === "text") {
            objectSelected.textAlign = kant;
            setButtonImages(image);
        }
        canvas.calcOffset();
        canvas.renderAll();
    };

    /**
     * De functie colorPicker is bedoeld om de kleurDe colorpicker.
     * Hiermee wordt de kleur voor de achtergrond van de canvas verandert.
     * Indien het een text object is wordt de kleur van de tekst veranderen wanneer je op de tab tekst bent.
     * De achtergrondkler wordt alleen verandert als je op tab kleur zit of envelop (dan verander hij de achtergrondkleur van de envelop).
     * Eerst wordt de picker opgehaald en context.
     * dat wordt een nieuwe imagegemaakt en deze in de canvas picker gezet.
     * Wanneer je op de picker klikt kijkt hij dus eerst op welke tab je bent om te weten wat hij moet verwijderen.
     * Om de kleur te weten wordt er gekeken op welke positie je klikt en op die positie haalt hij de rgb van 1 pixel en geeft dat mee.
     */
    function colorpicker() {
        var c = document.getElementById("picker");
        var ctx = c.getContext('2d');
        var image = new Image();
        image.src = "Content/images/colorwheel.png";
        image.onload = function () {
            ctx.drawImage(image, 0, 0)
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
            if (TAB === "Bewerken1") {
                if (canvas.getActiveObject() && canvas.getActiveObject().type === "text") {
                    console.log("text object selected");
                    kleurtext(canvas.getActiveObject(), kleurPixel);
                } else {
                    console.log("no text object selected");
                }
            }
            else if (TAB === "Bewerken4" || TAB === "Bewerken5") {
                vulKleur(kleurPixel);
            }
            canvas.calcOffset();
            canvas.renderAll(); })
    };

    /**
     * Deze functie is bedoeld om de achtergrond plaatje te veranderen en achtergrondkleur te verwijderen.
     * Eerst wordt de achtergrond gecleared.
     * Dan maakt je een image object van de geselecteerde image, daarna maak je er ee fabric image van wordt deze geset als background image.
     */
    document.getElementById('achtergrondImage').onchange = function handleImage(e) {
        checkBackgroundColorenImage();
        var reader = new FileReader();
        reader.onload = function (event) { console.log('fdsf');
            var imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function () {

                var image = new fabric.Image(imgObj);
                canvas.setBackgroundImage(imgObj.src, function() {
                    canvas.renderAll();
                });
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        canvas.calcOffset();
        canvas.renderAll();
    };


    /**
     * Deze functie wordt opgeroepen waneer je de achtergrondimage verandert.
     * wanneer er een achtergrondimage is of bacrgoundcolor worden deze op none gezet(verwijdert)
     */
    function checkBackgroundColorenImage(){
        if (canvas.backgroundImage) {
            canvas.backgroundImage = 'none';
        }

        if(canvas.backgroundColor){
            canvas.backgroundColor = 'none';
            canvas.calcOffset();
            canvas.renderAll();
        }
    };

    /**
     * Deze functie verandert de kleur van de achtergrond en verwijder het achtergrondplaatje.
     * @param kleur de kleur van de achtergrond
     */
    var vulKleur = function (kleur) {
        if (canvas.backgroundImage) {
            canvas.backgroundImage = 'none';
        }
        canvas.backgroundColor = kleur;
        canvas.calcOffset();
        canvas.renderAll();
    };

    /**
     * Deze functie is bedoeld om de kleur van de tekst te veranderen.
     * @param text : de tekst waarvan de kleur verandert  moet worden.
     * @param kleur : de kleur waarvan de tekst in moet veranderen.
     */
    var kleurtext = function (text, kleur) {
        text.fill = kleur;
        canvas.calcOffset();
        canvas.renderAll();
    };

    /**
     * Deze functie zorgt ervoor dat wanneer er tekst geselecteerd is,
     * en er wordt getyped, dat de tekst wordt aangepast.
     *
     * keypress:
     *      bij enter: op volgende lijn verder gaan.
     *      In de regex staan de toegestane characters.
     *
     * keydown:
     *      backspace: een character deleten.
     *      delete: verwijder hele tekst object.
     */
    $(document)
        .on('keypress', function (e) {
            var code = (e.keyCode|| e.which);
            var keyPressed = String.fromCharCode(code);
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
     * Deze functie is bedoeld om een canvas te resetten.
     */
    function reset () {
        canvas.clear();
    };

    /**
     * Deze functie is bedoeld om de iconengallery van envelop te updaten.
     * Wanneer een object is geselecteerd en het is van de type image moet hij door een loop,
     * om te kijken of de geselecteerde image gelijk is aan een image in de imageOnCanvas array (icoons die geadd zijn op de canvas).
     * Indien de objectsrc bestaad in de imagesoncanvas moet hij nog een keer door de loop om te kijken of hij vaker voorkomt.
     * Wanneer een icoon vaker voorkomt (dit wordt gekeken om de zien of hij ook bestaat in de array imagesOnCanvasDouble.
     * Indien hij vaker voorkomt wordt deze icoonsrc verwijdert uit de imagesOnCanvasDouble en wordt de loop gestopt.
     * Wanneer een image niet vaker voorkomt in de canvas dan wordt hij verwijdert uit de array imagesOnCanvas en de envelopcanvas wordt gecleard(reset).
     * De maakGalleryGebruikteIconen functie wordt ook opgeroepen om de icoonGallery te updaten omdat er een icoon is verwijdert.
     * @param objectSelected
     */
    function setIcoonDeletedFromCanvas(objectSelected) {
        var doubleObject = false;
        if (objectSelected && objectSelected.type === "image") {
            var ObjectSrc = objectSelected._element.src.split("/").pop();
            for (var i = 0; i < imagesOnCanvas.length; i++) {
                var ImagesSrc = imagesOnCanvas[i];
                if (ObjectSrc === ImagesSrc) {
                    for (var j = 0; j < imagesOnCanvasDouble.length; j++) {
                        if (ObjectSrc === imagesOnCanvasDouble[j]) {
                            doubleObject = true;
                            imagesOnCanvasDouble.splice(j, 1);
                            j = imagesOnCanvasDouble.length + 1;
                        }

                    }
                    if (doubleObject === false) {
                        imagesOnCanvas.splice(i, 1)
                        envelopcanvas.clear();
                        maakGalleryGebruikteIconen();
                    }
                }
            }
            doubleObject = false;
        }
    };

    /**
     * Deze functie is bedoeld om een object de verwijderen.
     * wanneer een object is geselecteerd wordt de functie setIcoonDeletedFromCanvas opgeroepen,
     * Dit om de iconen gallery van envelop up to daten.
     * Daarna wordt de object op de canvas verwijdert
     */
    this.removeObject = function () {
        var objectSelected = canvas.getActiveObject();
        if(objectSelected){
            setIcoonDeletedFromCanvas(objectSelected);
            canvas.remove(objectSelected);
        }
    };

    /**
     * Deze functie is bedoeld om het geselecteerde object naar voren te halen.
     */
    this.bringToFront = function () {
        var objectSelected = canvas.getActiveObject();
        if(objectSelected){
            objectSelected.bringToFront();
        }
    };

    /**
     * Deze functie is bedoeld om het geselecteerde object naar achteren te zetten.
     */
    this.sendToBack= function() {
        var objectSelected = canvas.getActiveObject();
        if(objectSelected){
            objectSelected.sendToBack();
        }
    };

    /**
     * Deze functie wordt opgeroepen wanneer je de value verandert van tekstgrootte.
     * Eerst wordt er gekeken of je een object hebt geselecteerd en of een tekst is.
     * Indien dit het geval is wordt de fontsize geset en de canvas gerenderd om dit te kunnen zien op de canvas.
     */
    document.getElementById('tekstSlider').onchange = function() {
        var value = this.value;
        var selectedObject = canvas.getActiveObject();
        if (selectedObject && selectedObject.type === "text") {
            selectedObject.fontSize = value;
            canvas.calcOffset();
            canvas.renderAll();
        } else {
            alert('u moet eerst een tekst selecteren');
        }
    };

    /**
     * Deze functie wordt opgeroepen wanneer je de value verandert van Transpiratie.
     * Eerst wordt de value geset, het wordt gedeeld door 100 omdat je cijfers achter de komma wil hebben voor transpiratie,
     * De transpiratie moet tussen de 0 en 1 zitten, dus als value 40 is en dat gedeeld doo 100 = 0.4.
     * Dan wordt er gekeken of er een object is geselecteerd en of hij van het type image is,
     * indien dit het geval is set hij de opacity met de value erin.
     * De canvas wordt gerenderd zodat je het kan zien op de canvas.
     */
    document.getElementById('transSlider').onchange = function() {
        var value = this.value / 100;
        var objectSelected = canvas.getActiveObject();
        if (objectSelected && objectSelected.type === "image") {
            objectSelected.setOpacity(value);
            canvas.calcOffset();
            canvas.renderAll();
        }else{
            alert("u moet eerst een image selecteren");
        }
    };

    /**
     * Deze functie wordt opgeroepen wanneer je de value van brightnes, tint(sepia) en saturation(grayscale) verandert.
     * Deze functie wordt door tint en saturation opgeroepen vanwegen een bug waardoor de foto op originele grootte wordt gezet.
     * Als eerst wordt er gekeken of je een object hebt geselecteerden of het van de type image is.
     * indien dit zo is kijkt hij of er al een brightness op is gezet, indien er geen brightness is gezet wordt er een nieuwe filter gepushed op de image en wordt de brightnesson op true gezet.
     * Wanneer de brightnesson true is kijkt hij naar alle filters van het object, wanneer er een brightness filter al bestaat verander je de value alleen.
     * daarna wordt alle gerendered zodat je het op de canvas kan zien.
     * @param objectSelected :het object waar je op hebt geselecteerd.
     * @param value : de range/value wat de brightness moet hebben.
     */
    function setBrightness(objectSelected, value) {
        if (objectSelected && objectSelected.type === "image") {
            if (BrightnessOn == true) {
                for (var i = 0; i < objectSelected.filters.length; i++) {
                    if (objectSelected.filters[i].type == "Brightness") {
                        objectSelected.filters[i]['brightness'] = value;
                    }
                }
            }
            if (BrightnessOn == false) {
                objectSelected.filters.push(new fabric.Image.filters.Brightness({ brightness:value }));
                BrightnessOn = true;
            }
            objectSelected.applyFilters(canvas.renderAll.bind(canvas));
        }
    };

    /**
     * Deze functie wordt opgeroepen wanneer je de value verandert van de brightness.
     * Daarna wordt de functie setBrightness opgeroepen en de geselecteerde object en value van de range wordt meegegeven.
     */
    document.getElementById('brightnessSlider').onchange = function() {
        var value = parseInt(this.value);
        var objectSelected = canvas.getActiveObject();
        setBrightness(objectSelected, value);
    };

    /**
     *  Deze functie wordt opgeroepen wanneer je de value verandert van de tint(Sepia) range.
     *  Dan wordt de brightness filter over de image gezet, dit wordt gedaan vanwegen een bug,
     *  De bug is: wanneer je geen filters hebt en je past de saturatie aan (dus je zethem aan en dan weer aan) word de foto geset op de originele grootte,
     *  wat niet moet gebeuren, vanwegen deze bug wordt er dus eerst een filter gezet want als er een filter bestaat komt dit probleem  niet voor.
     *  Eerst wordt er gekeken of je een object hebt geselecteerd en of het van de type image is.
     *  Indien dit het geval is kijkt hij eerst naar de value van de range, wanneer hij op 0 staat moet de filter weg (de filter wordt verwijderdt).
     *  Wanneer er geen filter is wordt er een nieuwe gepushed. Daarna worden de filter gerendered (applied) en je ziet de uitkomst op de canvas.
     */
    document.getElementById('tint').onchange = function() {
        var value = parseInt(this.value);
        var objectSelected = canvas.getActiveObject();
        var brigtnessValue = 1;
        if(objectSelected.filters.length === 0){
            setBrightness(objectSelected, brigtnessValue)
        }
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
    };

    /**
     *  Deze functie wordt opgeroepen wanneer je de value verandert van de saturatie(zwart-wit) range.
     *  Dan wordt de brightness filter over de image gezet, dit wordt gedaan vanwegen een bug,
     *  De bug is: wanneer je geen filters hebt en je past de saturatie aan (dus je zethem aan en dan weer aan) word de foto geset op de originele grootte,
     *  wat niet moet gebeuren, vanwegen deze bug wordt er dus eerst een filter gezet want als er een filter bestaat komt dit probleem  niet voor.
     *  Eerst wordt er gekeken of je een object hebt geselecteerd en of het van de type image is.
     *  Indien dit het geval is kijkt hij eerst naar de value van de range, wanneer hij op 0 staat moet de filter weg (de filter wordt verwijderdt).
     *  Wanneer er geen filter is wordt er een nieuwe gepushed. Daarna worden de filter gerendered (applied) en je ziet de uitkomst op de canvas.
     */
    document.getElementById('saturatie').onchange = function() {
        var value = parseInt(this.value);
        var objectSelected = canvas.getActiveObject();
        var brigtnessValue = 1;
        if(objectSelected.filters.length === 0){
            setBrightness(objectSelected, brigtnessValue)
        }
        if (objectSelected && objectSelected.type === "image") {
            if((value === 0) && (objectSelected.filters.length != 0) && (GrayscaleOn === true)){
                for (var i=0;i<objectSelected.filters.length; i++) {
                    if(objectSelected.filters[i].type === "Grayscale") {
                        objectSelected.filters.splice(i,1);
                        GrayscaleOn=false;
                    }
                }
            }
            else if(GrayscaleOn === false) {
                objectSelected.filters.push(new fabric.Image.filters.Grayscale);
                GrayscaleOn=true;
            }
            objectSelected.applyFilters(canvas.renderAll.bind(canvas));
        }
        else{
            alert("U moet eerst een foto selecteren.");
        }
    };

    /**
     * Deze functie wordt opgeroepen wanneer je op de selectbox klikt voor de tekst.
     * Eerst wordt de geselecteerde object opgesalegn in een variable indien er een object is geselecteerd en het is van de type text wordt de font aangepast.
     * Indien het geen tekst is wordt er een alert gegeven om een tekst eerst te selecteren.
     * Wanneer je een text object hebt geselecteerd wordt er eerst gekeken naar de combobox en daarna daar de geselecteerde option.
     * De tekst die in de option zit slaat hij op als selected en geeft dat mee aan de setChange functie.
     * In de setChange functie verandert hij de font en daarna set hij de canvas goed en rendert het zodat je het kunt zien op de canvas.
     */
    $('#combo').click(function (e) {
        var text = canvas.getActiveObject();
        if (text && text.type === "text") {
            this.setFont = function() {
                var combobox = document.getElementById("combo");
                var selected = combobox.options[combobox.selectedIndex].text;
                setChange("fontFamily", selected);
                canvas.calcOffset();
                canvas.renderAll();
            }
        }
        else {
            alert("u moet eerst een tekst selecteren!!");
        }
    });

    /**
     * De functie loadTemplatePublic wordt opgeroepen om de template te laden.
     * De data van alle objecten wordt hiermee doorgegeven en de achtergrond, deze worden dan toegepast op de canvas.
     * Daarna wordt de canvas gerenderd om alles op de canvas te zien.
     * @param data : de data die wordt meegegen nadat je een template hebt gekozen en verder ging.
     */
    this.loadTemplatePubliek = function(data) {
        canvas.loadFromJSON(data.voorkant);
        canvas.renderAll();
    };

    /**
     * De functie loadTemplate wordt net als loadTemplatePublic opgeroepen om de template te laden.
     * Het enige verschild tussen deze twee is dat de loadTemplate bedoeld is als je je eigen specifieke kaart wil bewerken die je eerder hebt gemaakt.
     * Hij krijgt de data binnen en door laodRromJson op de roepen en de data mee te geven wordt dit op de canvas gezet.
     * Her verschil tussen public en private s dus dat je bij public iedereen het kan zien en je hebt alleen de voorkant,
     * Bij private is het je eigen kaart die je hebt gemaakt en de voorkant, midden en envelop worden opgehaald en op de canvas gezet.
     * Daarna worden alle canvassen gerendered waardoor je alle objecten ook ziet op de canvassen.
     * @param data
     */
    this.loadTemplate = function(data) {
        canvas.loadFromJSON(data.voorkant);
        middelsteCanvas.loadFromJSON(data.midden);
        envelopcanvas.loadFromJSON(data.envelop);
        canvas.renderAll();
        middelsteCanvas.renderAll();
        envelopcanvas.renderAll();
    };

    /**
     * De functie templateGekozen is bedoeld om de array imagesOnCanvas en imagesOnCanvasDouble up to daten.
     * Deze functie wordt opgeroepen wanneer je een template hebt gekozen. De bedoeling van deze functie is om achter te komen welke iconnen er zijn gebruikt en of ze vaker zijn gebruikt.
     * Als eerst krijg je de data mee die de editorcontroller binnen krijgt wanneer hij de service oproept om data op te halen.
     * De data is json data en deze wordt eers geparsed zodat je de data kunt gebruiken.
     * Dan wordt er gekeken of er type image objecten zijn indien er images zijn gaat hij kijken of de image wel een icoon is.
     * Om te checken of het een icoon is gaat hij dus door een loop en kijkt of hij in de array images voorkomt.
     * Indien hij een icoon is wordt de setIcoonsUsed functie opgeroepen om de array imagesOnCanvas en imagesOnCanvasDouble te updaten voor wanneer je een icoon wil gebruiken op de envelop.
     * @param data
     * @constructor
     */
    this.templateGekozen = function(data){
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
    };

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

    $('#volgendeknop').click(function(e){
        e.stopPropagation();
        alert("Dit is niet geïmplementeerd");
    });
}