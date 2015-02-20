
(function () {

    function navBarCtrl(ScrollService, $rootScope, $state) {
        var self = this;
        var nav = [];
        ScrollService.scroll();
        
        console.log($state.current.name);
        self.nav = ScrollService.getNav($state.current.name);
   
        self.getNav = function () { return self.nav }

        

}

angular.module('eliApp')
  .controller('navBarCtrl', ['ScrollService', '$rootScope', '$state', navBarCtrl]);

}());
