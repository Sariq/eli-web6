(function () {
    function LogInCtrl(AuthService, $scope, $location, $rootScope, localStorageService, jwtHelper, ipCookie) {
        var self = this;
        console.log("LogInCtrl")
        
        $scope.obj={}
        $scope.obj.user = AuthService.create();
        $scope.ob={};
        $scope.ob.navShow=false;
        /*     $scope.$on('authLoaded', function() {
              alert()
            $scope.isExpert($scope.main.serieId);
            $scope.isMember($scope.main.serieId);
          });*/
        $scope.$on('logOut', function () {
            $location.path("/logIn")
            localStorageService.cookie.remove('id_token');
            $rootScope.nav.show = false;
            
            console.log( $scope.userInfo) 

        });
    
      //  alert(jwtHelper.getTokenExpirationDate((localStorageService.cookie.get('id_token'))))

        //jwt
        //var expToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOm51bGwsIl91c2VySWQiOiIiLCJfcGFzc3dvcmQiOiIiLCJfZmlyc3ROYW1lIjpudWxsLCJfbGFzdE5hbWUiOm51bGwsIl9lbWFpbCI6bnVsbCwiX2lzQWRtaW4iOmZhbHNlLCJfaXNPbmxpbmUiOmZhbHNlLCJleHAiOiIxNDA1ODEwOTIyIn0.GlLSRpGnIfnef6kfdxATs_RnCIVmPCg8bvqa8TbcQJo';
      //  var expToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfdXNlcklkIjoiNTQ5OTc4NGYyMGUxYjUyNzFjYjVhZGY4IiwiZXhwIjoiMTQxOTcyNzA4OCIsImp0aSI6IjA0YmU3NjA1NzAwZTQ1ZGRiODI4ZjhjN2RmNGI5OTNhIn0.1PShyVmXVgzd2i8i6UwRF4_vTJ7T43D7PrQ5gwHdELs'
        //var tokenPayload = jwtHelper.decodeToken(expToken);
        //console.log(tokenPayload);
     //   var date = jwtHelper.getTokenExpirationDate(expToken);
     //   var bool = jwtHelper.isTokenExpired(expToken);
     //   console.log(date)
     //   console.log(bool)
        //if (localStorageService.isSupported) {
        //    console.log("yes");
        //}

        //if (localStorageService.cookie.isSupported) {
        //    console.log(localStorageService.getStorageType());
        //} else { console.log("no"); }


        function getToken(key) {
            return localStorageService.cookie.get(key);
        }
        function loadAuth() {
          //  $location.path('/logIn')
            //$scope.obj.user.$save(function(d) {
            //         $scope.obj.user =d;
            //        // console.log(self.user)
              
               
            //          $rootScope.$broadcast("authLoaded");

                
            //           $location.path('/logIn')

            //         },function(d) {
            //         $scope.error =d;
            //         console.log($scope.error)
            //          $scope.obj.user.password=''
            //         });
        }
        
        //localStorageService.cookie.set('test', 'sariTest')
        $scope.logIn = function () {

           
            AuthService.setUserInfo($scope.obj.user);
           
            
            $scope.obj.user.$save(function (d, getResponseHeaders) {
                
                $scope.id_token = getResponseHeaders()['id_token'];
                AuthService.saveToken('id_token', $scope.id_token);
              $scope.obj.user =d;
            
         
               AuthService.setUserInfo($scope.obj.user);
             
               $rootScope.$broadcast("authLoaded");
               $rootScope.nav.show = true;
                //console.log( AuthService.userInfo)
                $location.path('/dashboard')

             }, function (d) {
                 $scope.error = d;
               //  console.log($scope.error.data._errorDescription)
                 swal({ title: $scope.error.data.error_description, text: "Please check your User Name and Password!", type: "warning", confirmButtonText: "Try Again" }, function (isConfirm) { if (isConfirm) { } });
              $scope.error =d;
           //  console.log($scope.error)
               //$scope.obj.user._password=''
              });
      
    


/*    Auth.login({
      username: $scope.main.credentials.email,
      password: $scope.main.credentials.password
    }).success(function(data) {
      if (data.error) {
        toastr.error(data.error);
      } else {
        toastr.success("You are signed in!");
        $scope.$broadcast("authLoaded");
        $scope.main.credentials = {};
        Popup.close();
      }
    });*/
  

//POST   
/*console.log(self.user)      
  self.user.$save(function(d) {
              self.w=d;
              console.log(self.w)
              });*/
//UPDATE
/*  self.user.$update(function(d) {
              self.w=d;
              console.log(self.w)
              });*/
//GET
//AuthService.get(1);

//DELETE
/*self.user.$remove({id: 1}, function(d) {
              self.w=d;
              console.log(self.w)
              });*/
    }

loadAuth();
  }

  angular.module('eli.admin')
    .controller('LogInCtrl', ['AuthService', '$scope', '$location', '$rootScope', 'localStorageService','jwtHelper','ipCookie', LogInCtrl]);
}());
