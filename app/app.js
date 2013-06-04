/// <reference path="../Scripts/angular.js" />

var app = angular.module('postkamer', []);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/home',
        {
            controller: 'HomepageCtrl',
            templateUrl: '/postkamer/app/partials/Homepage.html'
        })

        .when('/templates',
        {
            controller: 'TemplateCtrl',
            templateUrl: '/postkamer/app/partials/Templates.html'
        })

        .when('/editor',
        {
            controller: 'EditorCtrl',
            templateUrl: '/postkamer/app/partials/Editor.html'
        })

        .when('/editorStaand',
        {
            controller: 'EditorCtrl',
            templateUrl: '/postkamer/app/partials/EditorStaand.html'
        })

        .when('/overzicht',
        {
            controller: 'OverzichtCtrl',
            templateUrl: '/postkamer/app/partials/Overzicht.html'
        })

        .when('/overOns',
        {
            controller: '',
            templateUrl: '/postkamer/app/partials/OverOns.html'
        })

        .when('/hoeWerktHet',
        {
            controller: '',
            templateUrl: '/postkamer/app/partials/HoeWerktHet.html'
        })

        .when('/contact',
        {
            controller: '',
            templateUrl: '/postkamer/app/partials/Contact.html'
        })

        .otherwise({ redirectTo: '/home' });
});




