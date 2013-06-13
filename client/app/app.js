/// <reference path="../Scripts/angular.js" />

var app = angular.module('postkamer', []);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/home',
        {
            controller: 'HomepageCtrl',
            templateUrl: '/postkamer/client/app/partials/Homepage.html'
        })

        .when('/templates',
        {
            controller: 'TemplateCtrl',
            templateUrl: '/postkamer/client/app/partials/Templates.html'
        })

        .when('/editor',
        {
            controller: 'EditorCtrl',
            templateUrl: '/postkamer/client/app/partials/Editor.html'
        })

        .when('/editorStaand',
        {
            controller: 'EditorCtrl',
            templateUrl: '/postkamer/client/app/partials/EditorStaand.html'
        })

        .when('/overzicht',
        {
            controller: 'OverzichtCtrl',
            templateUrl: '/postkamer/client/app/partials/Overzicht.html'
        })

        .when('/overOns',
        {
            controller: '',
            templateUrl: '/postkamer/client/app/partials/OverOns.html'
        })

        .when('/hoeWerktHet',
        {
            controller: '',
            templateUrl: '/postkamer/client/app/partials/HoeWerktHet.html'
        })

        .when('/contact',
        {
            controller: '',
            templateUrl: '/postkamer/client/app/partials/Contact.html'
        })

        .otherwise({ redirectTo: '/home' });
});




