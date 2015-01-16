(function () {
  function MainCtrl(MainService) {
    var self = this;
    //console.log("MainService");
    self.alertme=function(){
    	alert("yess");
    }

  }

  angular.module('eliApp')
    .controller('MainCtrl', ['MainService',MainCtrl]);
}());
