function OntwerpObject(){
    this.hoogte = null;
    this.breedte = null;
    this.positieY = null;
    this.positieX = null;
    this.transparantie = null;
}

OntwerpObject.prototype.getHoogte = function () {
    return this.hoogte;
};

OntwerpObject.prototype.setHoogte = function (hoogte) {
    this.hoogte = hoogte;
};

OntwerpObject.prototype.getBreedte = function () {
    return this.breedte;
};

OntwerpObject.prototype.setBreedte = function (breedte) {
    this.breedte = breedte;
};

OntwerpObject.prototype.getPositieY = function () {
    return this.positieY;
};

OntwerpObject.prototype.setPositieY = function (positieY) {
    this.positieY = positieY;
};

OntwerpObject.prototype.getPositieX = function () {
    return this.positieX;
};

OntwerpObject.prototype.setPositieX = function (positieX) {
    this.positieX = positieX;
};

OntwerpObject.prototype.getTransparantie = function () {
    return this.transparantie;
};

OntwerpObject.prototype.setTransparantie = function (transparantie) {
    this.transparantie = transparantie;
};