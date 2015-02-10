'use strict';


  angular.module('eliApp', [
  'ngCookies',
  'ngResource',
  'ui.router',
  'ngAnimate',
  'pascalprecht.translate',
  'LocalStorageModule',
  'luegg.directives'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $resourceProvider, $translateProvider) {
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'main/views/main.html',
        controller:'MainCtrl'
        ,controllerAs: 'main'
      })




      $translateProvider.translations('he', {
        HOME: 'בית',
        
       
    })
.translations('ar', {
    HOME: 'الرئيسية',

 
  });
      $translateProvider.preferredLanguage('he');
  });




