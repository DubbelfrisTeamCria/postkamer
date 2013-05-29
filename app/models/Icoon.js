
function Icoon() {
    this.naam = null;
}

Icoon.prototype = new OntwerpObject;

Icoon.prototype.getNaam = function() {
    return this.naam;
}

Icoon.prototype.setNaam = function(naam) {
    this.naam = naam;
}