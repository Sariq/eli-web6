(function () {
    function LogInCtrl(AuthService, $scope, $location, $rootScope, localStorageService) {
        var self = this;
        console.log("LogInCtrl");
        self.user = AuthService.getUserInfo();
        $scope.obj = {};
        $scope.obj.user = AuthService.create();
        $scope.ob = {};
        $scope.ob.navShow = false;

        $scope.$on('logOut', function () {
            $location.path("/logIn")
            localStorageService.cookie.remove('id_token');
            $rootScope.nav.show = false;
            AuthService.clearUserInfo();

        });
        //LogIn
        $scope.logIn = function () {

            $scope.obj.user.$save(function (data, getResponseHeaders) {
                $scope.obj.user = data;
                AuthService.setUserInfo($scope.obj.user);
                $scope.id_token = getResponseHeaders()['id_token'];
                AuthService.saveToken('id_token', $scope.id_token);
                $rootScope.$broadcast("authLoaded");
                $rootScope.nav.show = true;
                $location.path('/dashboard');

            }, function (d) {
                $scope.error = d;
                swal({ title: $scope.error.data.error_description, text: "Please check your User Name and Password!", type: "warning", confirmButtonText: "Try Again" }, function (isConfirm) { if (isConfirm) { } });
                $scope.error = d;
            });

        }


     
    }

    angular.module('eli.admin')
      .controller('LogInCtrl', ['AuthService', '$scope', '$location', '$rootScope', 'localStorageService', LogInCtrl]);
}());
