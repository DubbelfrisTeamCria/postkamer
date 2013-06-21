/*global angular */

/**
 * de postkamer app
 * @type {module}
 */
var app = angular.module('postkamer', []);

/**
 * Hier worden de routes geconfigureerd. Elke route wordt met een view en eventueel met een controller geassocieerd.
 * Wanneer de route niet bestaat, wordt er naar de 'home' view geleid.
 */
app.config(function ($routeProvider) {
    "use strict";
    $routeProvider
        .when('/home', {
            controller: 'HomepageCtrl',
            templateUrl: 'app/partials/Homepage.html'
        })

        .when('/templates', {
            controller: 'TemplateCtrl',
            templateUrl: 'app/partials/Templates.html'
        })

        .when('/editor', {
            controller: 'EditorCtrl',
            templateUrl: 'app/partials/Editor.html'
        })

        .when('/editorEnkel', {
            controller: 'EditorCtrl',
            templateUrl: 'app/partials/EditorEnkel.html'
        })

        .when('/editorStaand', {
            controller: 'EditorCtrl',
            templateUrl: 'app/partials/EditorStaand.html'
        })

        .when('/editorStaandEnkel', {
            controller: 'EditorCtrl',
            templateUrl: 'app/partials/EditorStaandEnkel.html'
        })

        .when('/overzicht', {
            controller: 'OverzichtCtrl',
            templateUrl: 'app/partials/Overzicht.html'
        })

        .when('/overOns', {
            controller: '',
            templateUrl: 'app/partials/OverOns.html'
        })

        .when('/hoeWerktHet', {
            controller: '',
            templateUrl: 'app/partials/HoeWerktHet.html'
        })

        .when('/contact', {
            controller: '',
            templateUrl: 'app/partials/Contact.html'
        })

        .when('/registreren', {
            controller: '',
            templateUrl: 'app/partials/Registreren.html'
        })
        .when('/inloggen', {
            controller: '',
            templateUrl: 'app/partials/inloggen.html'
        })

        .when('/adressen', {
            controller: '',
            templateUrl: 'app/partials/adressen.html'
        })
        .when('/overzichtformaat', {
            controller: 'OverzichtCtrl',
            templateUrl: 'app/partials/OverzichtFormaat.html'
        })
        .when('/versturing', {
            controller: 'OverzichtCtrl',
            templateUrl: 'app/partials/versturing.html'
        })
        .otherwise({ redirectTo: '/home' });
});






