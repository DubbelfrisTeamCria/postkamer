function OntwerpObject(){
    this._hoogte = null;
    this._breedte = null;
    this._positieY = null;
    this._positieX = null;
    this._transparantie = null;
}

OntwerpObject.prototype.getHoogte = function () {
    return this._hoogte;
};

OntwerpObject.prototype.setHoogte = function (hoogte) {
    this._hoogte = hoogte;
};

OntwerpObject.prototype.getBreedte = function () {
    return this._breedte;
};

OntwerpObject.prototype.setBreedte = function (breedte) {
    this._breedte = breedte;
};

OntwerpObject.prototype.getPositieY = function () {
    return this._positieY;
};

OntwerpObject.prototype.setPositieY = function (positieY) {
    this._positieY = positieY;
};

OntwerpObject.prototype.getPositieX = function () {
    return this._positieX;
};

OntwerpObject.prototype.setPositieX = function (positieX) {
    this._positieX = positieX;
};

OntwerpObject.prototype.getTransparantie = function () {
    return this._transparantie;
};

OntwerpObject.prototype.setTransparantie = function (transparantie) {
    this._transparantie = transparantie;
};