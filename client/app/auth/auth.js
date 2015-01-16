(function () {
  function LogInCtrl(AuthService) {
    var self = this;
    self.user = AuthService.create();
    self.logIn=function(){
//POST   
console.log(self.user)      
  self.user.$save(function(d) {
              self.w=d;
              console.log(self.w)
              });
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
    .controller('LogInCtrl', ['AuthService',LogInCtrl]);
}());
