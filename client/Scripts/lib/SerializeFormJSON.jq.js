/**
 * Small plugin that extends jQuery with a serializeFormJSON method that can be called on a form.
 *
 * @see http://css-tricks.com/snippets/jquery/serialize-form-to-json/
 */
(function ($) {
    /**
     * Serialized the form into valid JSON.
     *
     * @returns {{}}
     */
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);