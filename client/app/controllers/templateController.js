app.controller('TemplateCtrl', function( service,$scope) {

    document.body.style.cursor='wait';

    service.async().then(function(data) {
        document.body.style.cursor='wait';
        for (var i = 0; i < data.length; i++) {
            if (data[i].categorie == localStorage.categorie && data[i].private ===  "false") {
                getTemplate(data[i], data[i].positie);
            }
        }
        document.body.style.cursor ='default';
        selecteerTemplate();
    });
});