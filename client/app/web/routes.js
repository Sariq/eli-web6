
(function () {


    function routes($stateProvider, $urlRouterProvider, $resourceProvider) {
        $urlRouterProvider.when('/forParents_index', '/forParents_index/forParents');
        $urlRouterProvider.when('/info_for_prof_index', '/info_for_prof_index/info_for_prof');
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

  //forParents
       .state('forParents_index', {
           url: '/forParents_index',
           templateUrl: 'templates/forParents_index.html',
           controller: 'MainCtrl',
           controllerAs: ''

       })
       .state('forParents_index.forParents', {
           url: '/forParents',
           templateUrl: 'templates/forParents.html',
           controller: 'MainCtrl',
           controllerAs: ''

       })

        .state('forParents_index.abuse', {
            url: '/abuse',
            templateUrl: 'templates/abuse.html',
            controller: 'MainCtrl',
            controllerAs: ''

        })

      .state('forParents_index.abuse_signs', {
          url: '/abuse_signs',
          templateUrl: 'templates/abuse_signs.html',
          controller: 'MainCtrl',
          controllerAs: ''

      })
   //info_for_prof_index
       .state('info_for_prof_index', {
           url: '/info_for_prof_index',
           templateUrl: 'templates/info_for_prof_index.html',
           controller: 'MainCtrl',
           controllerAs: ''

       })

      .state('info_for_prof_index.info_for_prof', {
          url: '/info_for_prof',
          templateUrl: 'templates/info_for_prof.html',
          controller: 'MainCtrl',
          controllerAs: ''

      })


        .state('info_for_prof_index.info_for_educators', {
            url: '/info_for_educators',
            templateUrl: 'templates/info_for_educators.html',
            controller: 'MainCtrl',
            controllerAs: ''

        })

         .state('info_for_prof_index.info_for_therapists', {
             url: '/info_for_therapists',
             templateUrl: 'templates/info_for_therapists.html',
             controller: 'MainCtrl',
             controllerAs: ''

         })
         .state('info_for_prof_index.abuse_detection', {
             url: '/abuse_detection',
             templateUrl: 'templates/abuse_detection.html',
             controller: 'MainCtrl',
             controllerAs: ''

         })



        

      .state('abuse', {
          url: '/abuse',
          templateUrl: 'templates/abuse.html',
          controller: 'MainCtrl',
          controllerAs: ''

      })

      .state('abuse_signs', {
          url: '/abuse_signs',
          templateUrl: 'templates/abuse_signs.html',
          controller: 'MainCtrl',
          controllerAs: ''

      })
      .state('internet_safety', {
          url: '/internet_safety',
          templateUrl: 'templates/internet_safety.html',
          controller: 'MainCtrl',
          controllerAs: ''

      })
      .state('info_for_prof', {
          url: '/info_for_prof',
          templateUrl: 'templates/info_for_prof.html',
          controller: 'MainCtrl',
          controllerAs: ''

      })
      .state('info_for_educators', {
          url: '/info_for_educators',
          templateUrl: 'templates/info_for_educators.html',
          controller: 'MainCtrl',
          controllerAs: ''

      })
      .state('abuse_detection', {
          url: '/abuse_detection',
          templateUrl: 'templates/abuse_detection.html',
          controller: 'MainCtrl',
          controllerAs: ''

      })
      .state('info_for_therapists', {
          url: '/info_for_therapists',
          templateUrl: 'templates/info_for_therapists.html',
          controller: 'MainCtrl',
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
