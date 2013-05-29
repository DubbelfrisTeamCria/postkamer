/**
 * Created with JetBrains PhpStorm.
 * User: Almira
 * Date: 29-5-13
 * Time: 12:32
 * To change this template use File | Settings | File Templates.
 */

function Text() {
    this.tekst = null;
    this.kleur = null;
    this.tekstStyle = null;
}

Text.prototype = new OntwerpObject;

Text.prototype.getTekst = function () {
    return this.tekst;
};

Text.prototype.setTekst = function (tekst) {
    this.tekst = tekst;
};

Text.prototype.getKleur = function () {
    return this.kleur;
};

Text.prototype.setKleur = function (kleur) {
    this.kleur = kleur;
};

Text.prototype.getTekstStyle = function () {
    return this.tekstStyle;
};

Text.prototype.setTekstStyle = function (tekstStyle) {
    this.tekstStyle = tekstStyle;
};