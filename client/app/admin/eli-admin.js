'use strict';


angular.module('eli.admin', [
  'ngResource',
  'eli.common',
          'ngMaterial',
          'tc.chartjs',

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
  .config(function (jwtInterceptorProvider, $httpProvider, localStorageServiceProvider) {
      //jwt
      jwtInterceptorProvider.tokenGetter = function () {
          console.log("AuthService Call")
          jwtInterceptorProvider.tokenGetter = ['AuthService', function (AuthService) {
              return AuthService.getTokenId();
          }];
      };
      $httpProvider.interceptors.push('jwtInterceptor');

      //localStorage Settings
      localStorageServiceProvider
   .setPrefix('')
   .setStorageCookie('/');

  })

angular.module('eli.admin')
.run(function ($rootScope, $location, AuthService) {

    $rootScope.nav = {};
    var tokenId = AuthService.TokenId();

    if (tokenId == null) {
        $rootScope.nav.show = false;
        $location.path("/logIn")
    }
    else {
        $rootScope.nav.show = true;
        $location.path($location.path())
    }


});




 //TO CHECK
angular.module('eli.admin').filter("idToUserName", function (UserAdmin) {
    return function (items) {
      
        var userList = UserAdmin.getUserList();


      //  alert(angular.toJson(items))
        for (var i = 0; i < items.length; i++) {

            for (var j = 0; j < userList.length; j++) {

                if (items[i].fromUser[0] == userList[j]._id) {
                    items[i].fromUser[0] = userList[j].userId;
                    
                }
            }
        }


        return items;
    };
});

angular.module('eli.admin').filter("idToRole", function (RoleService) {
    return function (roleId) {

        var roleList = RoleService.getRoleList();


        //  alert(angular.toJson(items))
        for (var i = 0; i < roleList.length; i++) {

            if (roleId == roleList[i]._id) {
                roleId = roleList[i].role;

            }
        }


        return roleId;
    };
});
angular.module('eli.admin').filter("jsDate", function () {
    return function (x) {
        if(x)
        return new Date(parseInt(x.substr(6)));
    };
});
angular.module('eli.admin').filter("inboxDate", function ($filter) {
    return function (x) {
        var first = new Date(parseInt(x.substr(6)));
        var second = new Date();
        var diff = second - first;
        var inDays = Math.floor(diff / 86400000)

        if (inDays == 0) {
            return $filter('date')(first, 'a h:mm')
        } else {
            return $filter('date')(first, 'd MMM')
        }
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

angular.module('eli.admin').config(['$validationProvider', 'tagsInputConfigProvider', function ($validationProvider, tagsInputConfigProvider) {
    $validationProvider.showSuccessMessage = false; // or true(default)

    //Validation Settings
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


    //Tags Settigns
    tagsInputConfigProvider
     .setDefaults('tagsInput', {
         placeholder: ''

     })
    .setActiveInterpolation('tagsInput', {
        placeholder: false

    })



}]);

angular.module('eli.admin').config(function ($provide) {
    $provide.decorator('$uiViewScroll', function ($delegate) {
        return function (uiViewElement) {
             var top = uiViewElement.getBoundingClientRect().top;
             window.scrollTo(0, (top - 30));
            // Or some other custom behaviour...
        };
    });
});
