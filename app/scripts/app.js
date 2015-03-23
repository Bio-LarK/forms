'use strict';

/**
 * @ngdoc overview
 * @name formsApp
 * @description
 * # formsApp
 *
 * Main module of the application.
 */
angular
    .module('formsApp', [
        'ngAnimate',
        'ngRoute',
        'ngSanitize',
        'ui.select',
        'ui.bootstrap',
        'google.places',
        'ngMaterial',
        'ui.utils',
        'mgo-angular-wizard'
    ])
    .run(function (pageService, $rootScope, $location) {
        $rootScope.pageService = pageService;
        $rootScope.$location = $location;
    })
    .config(function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
        })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .when('/request', {
                templateUrl: 'views/request.html',
                controller: 'RequestCtrl'
            })
            .otherwise({
                redirectTo: '/dashboard'
            });
    });

