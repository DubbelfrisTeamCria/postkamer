
function Foto() {
    this.url = null;
}

Foto.prototype = new OntwerpObject;

Foto.prototype.getUrl = function() {
    return this.url;
}

Foto.prototype.setUrl = function(url) {
    this.url = url;
}