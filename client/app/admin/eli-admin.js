'use strict';


angular.module('eli.admin', [ 
  'ngResource', 'eli.common',
  'ui.router',
  'ui.bootstrap',
  'LocalStorageModule',
  'angular-jwt',
  'angular-websocket',
  'ipCookie',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker',
  'pascalprecht.translate',
  'angularTranslateApp'
])
  .config(function ($stateProvider, $urlRouterProvider, $resourceProvider, jwtInterceptorProvider, $httpProvider) {
      //delete $httpProvider.defaults.headers.common['X-Requested-With'];


      console.log("config Storage2")
      //jwt
      jwtInterceptorProvider.tokenGetter = function () {
          console.log("AuthService Call")
          jwtInterceptorProvider.tokenGetter = ['AuthService', function (AuthService) {
  

              return AuthService.getTokenId();
          }];
      };
      $httpProvider.interceptors.push('jwtInterceptor');
      //jwt

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'partials/dashboard.html',
      
      }) 
        .state('logIn', {
         url: '/',
        templateUrl: 'auth/views/logIn/logIn.html',
       
        controllerAs: 'logIn'

      })
   
          $urlRouterProvider.otherwise('/');
  })

  angular.module('eli.admin')
.run(function ($rootScope, $location, AuthService) {
    console.log("run");
    $rootScope.nav = {};
    var isToken = AuthService.TokenId();


    if (!isToken) {
         //   alert("log");
            $rootScope.nav.show = false;
            $location.path("/logIn")
        }
        else {
            $rootScope.nav.show = true;
            $location.path($location.path())
        }


});

  angular.module('eli.admin').config(function (localStorageServiceProvider) {

      console.log("config Storage1")
      localStorageServiceProvider
        .setPrefix('')

        .setStorageCookie('/');
  });




