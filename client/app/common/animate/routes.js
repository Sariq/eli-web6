(function () {

    function routes($stateProvider,$urlRouterProvider) {
        $stateProvider
      .state('page-home', {
          url: '/page-home',
          templateUrl: '/client/app/templates/animate/page-home.html',
          controller: 'HomeCtrl',
        controllerAs: 'home'

      })
              .state('page-about', {
                  url: '/page-about',
                  templateUrl: '/client/app/templates/animate/page-about.html',
                  controller: '',
                  controllerAs: ''

              })


     
  }
    angular.module('eliApp')
    .config(['$stateProvider','$urlRouterProvider',routes])



    function HomeCtrl(MainService) {
        var self = this;
    


    }

    angular.module('eliApp')
      .controller('HomeCtrl', [HomeCtrl]);

}());


