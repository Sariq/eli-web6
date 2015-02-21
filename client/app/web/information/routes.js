
(function () {


    function routes($stateProvider, $urlRouterProvider, $resourceProvider) {

        $stateProvider
       .state('forParents', {
           url: '/forParents',
           templateUrl: 'information/forParents.html',
           controller: '',
           controllerAs: ''

       })
   
    }
    angular.module('eliApp')
      .config(['$stateProvider', '$urlRouterProvider', '$resourceProvider', routes])




    function Parents(ScrollService, $rootScope, $state) {
        var self = this;
        var mytops = [];
       
        ScrollService.scroll();
        //self.nav = ScrollService.getNav($state.current.name);
    
        //alert("Parents")
        //alert($state.path());
        //alert($state.current.name)
    
        ScrollService.setNav(self.nav);
        self.getNav = function () {

            console.log($state.current.name)
            return ScrollService.getNav($state.current.name)
        }

        $rootScope.name = "sari";

}

angular.module('eliApp')
  .controller('Parents', ['ScrollService', '$rootScope', '$state', Parents]);

}());
