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

    this.editText =function(){
        canvas.on('object:selected', function(e) {
            var text = prompt("wat wilt u erin zetten?");

            var activeObject = e.target;
            activeObject.text = text;
            canvas.add(activeObject);
        })
    }

    this.setBold = function(){
        canvas.on('object:selected', function(e) {
            var activeObject = e.target;
            activeObject.fontWeight = "Bold";
        });
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
            vulKleur(kleurPixel);
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

    var vulKleur = function(kleur) {
        canvas.backgroundImage = 'none';
        canvas.backgroundColor = kleur;
        canvas.renderAll();
    }


}