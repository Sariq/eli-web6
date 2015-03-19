'use strict';


angular.module('eliApp', [
'ngCookies',
'eli.common',
   'ngAnimate',
'duScroll',

  'uiGmapgoogle-maps',

'ngResource',
'ui.router',

'ngAnimate',
'pascalprecht.translate',
'LocalStorageModule',
'ngSanitize'

])
.config(function ($stateProvider, $urlRouterProvider, $resourceProvider, $translateProvider, $animateProvider) {
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $animateProvider.classNameFilter(/angular-animate2/);
    $stateProvider
      .state('index', {
          url: '/',
          //templateUrl: 'main/views/main.html',
          templateUrl: '/client/app/web/main/main.html',
          controller: 'MainCtrl'
        , controllerAs: ''
      })


           .state('modal', {
               url: '/modal',
               templateUrl: 'templates/modal.html',

               controller: ''
        , controllerAs: ''
           })

           .state('home', {
               url: '/home',
               templateUrl: 'main/views/main.html',

               controller: ''
        , controllerAs: ''
           })





    $urlRouterProvider.otherwise('/');

    $translateProvider.translations('he', {
        Home: 'בית',
        Doing: 'מה אנחנו עושים',
        'help us': 'איך תוכלי לעזור',
        Information: 'מידע',
        'about us': 'אודיתנו',
        'contact us': 'צור קשר'

    })
.translations('ar', {
    HOME: 'الرئيسية',


});
    $translateProvider.preferredLanguage('he');
});



angular.module('eliApp').config(function (localStorageServiceProvider) {

    localStorageServiceProvider
      .setPrefix('')

      .setStorageCookie('/');
});

//angular.module('eliApp').config(function (uiGmapGoogleMapApiProvider) {
//    uiGmapGoogleMapApiProvider.configure({
//        //    key: 'your api key',
//        v: '3.17',
//        libraries: 'weather,geometry,visualization'
//    });
//})