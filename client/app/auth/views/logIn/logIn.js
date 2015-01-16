(function () {
    function LogInCtrl(AuthService, $scope, $location) {
    var self = this;
    self.test = ''
    console.log("LOGIN");
    self.user = AuthService.create();

     $scope.$on('authLoaded', function() {
      alert()
  /*  $scope.isExpert($scope.main.serieId);
    $scope.isMember($scope.main.serieId);*/
  });
 
     $scope.names = [];
     var data = [];
     for (var i = 0; i < 100; i++) {
         data.push('item' + i)
     }
     $scope.add = function () {
         if (data.length) $scope.names.splice(0, 0, data.pop());
     };
     $scope.remove = function (index) {
         $scope.names.splice(index, 1);
     };





    self.logIn=function(){
        console.log(self.user)
    self.user.$save(function(d) {
              self.user =d;
              console.log(self.user)
               //$scope.$broadcast("authLoaded");

              },function(d) {
                  self.error = d;
                  console.log("self.error")
              console.log(self.error)
               //self.user.Password=''
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


  }

  angular.module('eliApp')
    .controller('LogInCtrl', ['AuthService', '$scope', '$location', LogInCtrl]);
}());
