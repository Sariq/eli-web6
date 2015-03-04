'use strict';


angular.module('eli.admin', [ 
  'ngResource',
  'eli.common',
      'angularBootstrapNavTree',
      'AbnTest',
      'integralui',
      'ngTagsInput',
  'textAngular',
  'ui.router',
  'ui.bootstrap',
  'LocalStorageModule',
  'angular-jwt',
  'angular-websocket',
  'ipCookie',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker',
  'pascalprecht.translate',
  'angularTranslateApp',
  'ngTable',
  'validation',
  'validation.rule'

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
        url: '/',
        templateUrl: 'partials/dashboard.html',
      
      }) 
        .state('logIn', {
            url: '/logIn',
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




  angular.module('eli.admin').filter("jsDate", function () {
      return function (x) {
          return new Date(parseInt(x.substr(6)));
      };
  });
  angular.module('eli.admin').filter("inboxDate", function ($filter) {
      return function (x) {
          var first = new Date(parseInt(x.substr(6)));
          var second = new Date();
          var diff = first - second;

          // | date:'a h:mm'
          if (diff == 0) {
              return $filter('date')(first, 'd MMM')
          } else {
              return $filter('date')(first, 'd MMM')
          }
          
          //return Math.floor(diff / 86400000);
      };
  });

  angular.module('eli.admin').filter("startFrom", function () {
      return function (items, start) {
          if (items != undefined) {
           
              start = +start; //parse to int
              var tmpItems = [];
              tmpItems = items.slice(start);
             
              return tmpItems;
          }
      }
  });

  angular.module('eli.admin').config(['$validationProvider','tagsInputConfigProvider', function ($validationProvider, tagsInputConfigProvider) {
      $validationProvider.showSuccessMessage = false; // or true(default)

      var expression = {
          string: /^.{3,20}$/,
          identity: /^.[0-9]{8}$/,
      };

      var validMsg = {
          string: { error: 'הכנס שם באורך גדול מ-3' },
          identity: { error: 'הכנס ת.ז' },
          email: { error: 'הכנס אימייל' },
                  };

      $validationProvider.setExpression(expression) // set expression
                        .setDefaultMsg(validMsg);

      tagsInputConfigProvider
       .setDefaults('tagsInput', {
           placeholder: ''
          
       })
      .setActiveInterpolation('tagsInput', {
          placeholder: false
    
      })


    
  }]);