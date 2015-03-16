
(function () {


    function routes($stateProvider, $urlRouterProvider, $resourceProvider) {
        
        $stateProvider
       .state('main', {
           url: '/main',
           templateUrl: 'main/main.html',
           controller: 'MainCtrl',
           controllerAs: ''

       })
                   .state('testPage', {
                       url: '/testPage',
                       templateUrl: 'templates/testPage.html',
                       controller: '',
                       controllerAs: ''

                   })

       .state('forParents', {
           url: '/forParents',
           templateUrl: 'templates/forParents.html',
           controller: 'Parents',
           controllerAs: ''

       })
      .state('abuse', {
          url: '/abuse',
          templateUrl: 'templates/abuse.html',
          controller: 'Parents',
          controllerAs: ''

      })
      .state('abuse_signs', {
          url: '/abuse_signs',
          templateUrl: 'templates/abuse_signs.html',
          controller: 'Parents',
          controllerAs: ''

      })
      .state('internet_safety', {
          url: '/internet_safety',
          templateUrl: 'templates/internet_safety.html',
          controller: 'Parents',
          controllerAs: ''

      })
      .state('info_for_prof', {
          url: '/info_for_prof',
          templateUrl: 'templates/info_for_prof.html',
          controller: 'Parents',
          controllerAs: ''

      })
      .state('info_for_educators', {
          url: '/info_for_educators',
          templateUrl: 'templates/info_for_educators.html',
          controller: 'Parents',
          controllerAs: ''

      })
      .state('abuse_detection', {
          url: '/abuse_detection',
          templateUrl: 'templates/abuse_detection.html',
          controller: 'Parents',
          controllerAs: ''

      })
      .state('info_for_therapists', {
          url: '/info_for_therapists',
          templateUrl: 'templates/info_for_therapists.html',
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
