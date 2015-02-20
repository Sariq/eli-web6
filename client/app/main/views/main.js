(function () {
    function MainCtrl($state, ScrollService) {
        var self = this;
        ScrollService.scroll();
    //console.log("MainService");
        
        self.getNav = function () {

            console.log($state.current.name)
            return ScrollService.getNav($state.current.name)
        }

    	   
    
    	

  }

  angular.module('eliApp')
    .controller('MainCtrl', ['$state', 'ScrollService', MainCtrl]);
}());
