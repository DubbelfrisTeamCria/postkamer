app.controller('TemplateCtrl', function( service,$scope) {
    // Call the async method and then do stuff with what is returned inside our own then function

    console.log("Template controller opgehaald");  //controller wordt soms 2 keer opgehaald???
    document.body.style.cursor='wait';

    service.async().then(function(data) {
        document.body.style.cursor='wait';
        for (var i = 0; i < data.length; i++) {
            if (data[i].categorie == localStorage.categorie) {
                console.log("data[i].categorie: " + data[i].categorie + " localStorage.categorie: "+ localStorage.categorie);
                getTemplate(data[i], data[i].positie);
            }
        }
        document.body.style.cursor ='default';
        selecteerTemplate();
    });
});