function editor() {
    var images;
    var BrightnessOn = false;
    var GrayscaleOn = false;
    var SepiaOn= false;
    var EnvelopOn = false;
    var imagesOnCanvas =[];
    images = [
        {"url": "/postkamer/client/Content/images/icons/plaatje01.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje02.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje03.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje04.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje05.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje06.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje07.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje08.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje09.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje10.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje11.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje12.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje13.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje14.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje15.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje16.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje17.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje18.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje19.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje20.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje21.png"},
        {"url": "/postkamer/client/Content/images/icons/plaatje22.png"}
    ];
    var selectedIcon= null;
    var canvas = null;
    var TAB = "Bewerken1";
    var voorkantcanvas = new fabric.Canvas('canvas');
    var middelsteCanvas = new fabric.Canvas(getMiddelsteCanvas());
    var envelopcanvas = new fabric.Canvas('envelopcanvas');
    var voorkant = $("#canvas");
    var middelste = getMiddelste();
    var envelop = $("#envelopcanvas");
    var tekstMarge = 50;
    var standaardImageBreedte = 200;
    var indexCurrentPhoto = 0;

    setHidden();
    colorpicker();
    addText2("Vul hier je tekst in...");
    console.log(middelsteCanvas.type);
    if (middelsteCanvas.type == "binnenkant") {
        addImageBackground();
    }

    maakGallery();

    function getMiddelste() {
        var m = null;
        if (!localStorage.enkel) {
            middelsteCanvas.type = "binnenkant";
            m=  $("#binnenkantcanvas");
        }
        else if (localStorage.enkel) {
            middelsteCanvas.type = "achterkant";
            m = $("#achterkantcanvas");
        }
        return m;
    }

    function getMiddelsteCanvas() {
        var m = null;
        if (!localStorage.enkel) {
            m = "binnenkantcanvas"
        }
        else if (localStorage.enkel) {
            m = "achterkantcanvas"
        }
        return m;
    }

    function setHidden(){
        canvas = voorkantcanvas;
        voorkant.parent().css('margin-right', '325px');
        middelste.parent().css('display' ,'none');
        envelop.parent().css('display' ,'none');
        canvas.calcOffset();
        canvas.renderAll();
    }

    $('#voorKant').click(function(){
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

    $('#binnenKant, #achterKant').click(function(){
        canvas = middelsteCanvas;
        middelste.parent().css('display' ,'block');
        voorkant.parent().css('display' ,'none');
        envelop.parent().css('display' ,'none');
        canvas.calcOffset();
        canvas.renderAll();
        if(EnvelopOn == true){
            EnvelopOn=false;
            setDisplayKaart();
        }
    });

    $('#envelop').click(function(){
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
    this.getJSON = function () {
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
                if(tab.id != "Bewerken5"){
                    tab.firstChild.src= "Content/images/tab"+i+".png";
                }else{
                    tab.style.display="none";
                }
                content.style.display = "none";
            }
        }
    });

    function setDisplayEnvelop(){
        if(EnvelopOn == true){
            TAB = 'Bewerken5';
            setVisibleTabAndPLus();
            for(var i=1; i<6; i++) {
                var tab = document.getElementById("Bewerken"+i);
                var content = document.getElementById("tabpage_"+i);
                console.log(tab.id)
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
    function setDisplayKaart(){
        if(EnvelopOn == false){
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

                    if(tab.id != "Bewerken5"){
                        console.log(tab.id + " in setDisplaykaart and bewerken5 is not "+ tab.id)
                        tab.style.display = "block"
                        tab.firstChild.src= "Content/images/tab"+i+".png";
                    }
                    else{
                        tab.style.display = "none";
                    }
                    content.style.display = "none";

                }
            }
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




    function addImageToCanvas(src){

        var imgObj = new Image();
        imgObj.src = src;
        imgObj.onload = function () {
            // start fabricJS stuff
            var image = new fabric.Image(imgObj);
            image.set({
                left: 100,
                top: 250,
                angle: 0,
                padding: 10,
                cornersize: 10
            });

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
        e.preventDefault();
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
                    newText = text.text+ "\n";
                    stillTyping = true;
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
        if(objectSelected.type === "image"){
            for(var i = 0; i<imagesOnCanvas.length;i++){
                if(objectSelected._element.src == ("http://localhost"+ imagesOnCanvas[i])){
                    imagesOnCanvas.splice(i,1);
                }
            }
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
            if(BrightnessOn == true){
                for (var i=0;i<objectSelected.filters.length; i++)
                {
                    if(objectSelected.filters[i].type == "Brightness"){
                        objectSelected.filters[i]['brightness'] = value;
                    }
                }
            }
            if(BrightnessOn == false){
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
    document.getElementById('tint').onchange = function () {
        var value = parseInt(this.value);
        var objectSelected = canvas.getActiveObject();
        if (objectSelected.type === "image") {
            if(value == 0){
                for (var i=0;i<objectSelected.filters.length; i++)
                {
                    if(objectSelected.filters[i].type == "Sepia"){
                        objectSelected.filters.splice(i,1);
                        SepiaOn=false;
                    }
                }
            }
            else{
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
                for (var i=0;i<objectSelected.filters.length; i++)
                {
                    if(objectSelected.filters[i].type == "Grayscale"){
                        objectSelected.filters.splice(i,1);
                        GrayscaleOn=false;
                    }
                }
            }
            else{
                objectSelected.filters.push(new fabric.Image.filters.Grayscale);
                GrayscaleOn=true;
            }
            objectSelected.applyFilters(canvas.renderAll.bind(canvas));
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

    function maakGallery(){
        var iconGallery = document.getElementById("iconGallery");
        for (var i = 0; i < images.length; i++) {
            var img = document.createElement("img");
            img.src = images[i].url;
            iconGallery.appendChild(img);
            (function(index){
                img.onclick = function(){
                    addImageToCanvas(images[index].url);
                    imagesOnCanvas.push(images[index].url);
                    console.log(imagesOnCanvas)
                };
            }(i));
        }
    }

<<<<<<< HEAD



=======
    if (document.URL === "/postkamer/client/postkamer.html#/editor") {
        localStorage.enkel = false;
        localStorage.positie = "liggend";
    }
>>>>>>> origin/master
}

