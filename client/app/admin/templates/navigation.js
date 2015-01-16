(function () {
    function NavCtrl(AuthService, $scope, $rootScope) {
    var self = this;
    console.log("nav2");



   	  $scope.$on('authLoaded', function() {
       $scope.userInfo=AuthService.getUserInfo()

       //console.log( $scope.userInfo)


  });


       $scope.logOut=function(){
       	 $rootScope.$broadcast("logOut");

       }

  }

  angular.module('eli.admin')
    .controller('NavCtrl', ['AuthService', '$scope', '$rootScope', '$translatePartialLoader', '$translate', NavCtrl]);
}());
