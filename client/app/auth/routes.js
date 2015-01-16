(function () {


  function routes($stateProvider, $urlRouterProvider,$resourceProvider) {
        
      $stateProvider
      .state('/about', {
        templateUrl: 'views/about.html',
        controller: ''


      })
     .state('logIn', {
         url: '/logIn',
        templateUrl: 'client/app/auth/views/logIn/logIn.html',
        controller: 'LogInCtrl',
        controllerAs: 'logIn'

      })
$urlRouterProvider.otherwise('/');
  }
  angular.module('eliApp')
    .config(['$stateProvider','$urlRouterProvider','$resourceProvider',routes])

}());
