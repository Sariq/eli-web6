
(function () {


    function routes($stateProvider, $urlRouterProvider, $resourceProvider) {

        $stateProvider
       .state('forParents', {
           url: '/forParents',
           templateUrl: 'information/forParents.html',
           resolve: {
               fun: function ($rootScope) {
                   $rootScope.widgets = []
                 
               }

           },
           controller: 'Parents',
           controllerAs: ''

       })
   
    }
    angular.module('eliApp')
      .config(['$stateProvider', '$urlRouterProvider', '$resourceProvider', routes])



    function Parents($scope, $rootScope, $state) {
        var self = this;
        var mytops = [];
       
        $scope.widgets = [
     { component: 'indexSection' },
     { component: 'weDoing' },
     { component: 'professionalInfo' },
     { component: 'helpUs' },
     { component: 'aboutUs' }

        ]
  
        //self.nav = ScrollService.getNav($state.current.name);
    
        //alert("Parents")
        //alert($state.path());
        //alert($state.current.name)
    
   
        self.getNav = function () {

            console.log($state.current.name)
            return ScrollService.getNav($state.current.name)
        }

        $rootScope.name = "sari";

}

angular.module('eliApp')
  .controller('Parents', ['$scope','$rootScope', '$state', Parents]);

}());
