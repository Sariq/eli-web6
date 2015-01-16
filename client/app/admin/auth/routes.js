(function () {


  function routes($stateProvider, $urlRouterProvider,$resourceProvider) {
        
      $stateProvider
      .state('/about', {
        templateUrl: 'views/about.html',
        controller: ''


      })
   
     .state('navigation', {
         url: '/navigation',
        templateUrl: 'templates/navigation.html',
        controller: 'NavCtrl',
        controllerAs: 'NavCtrl'

      })
$urlRouterProvider.otherwise('/');
  }
  angular.module('eli.admin')
    .config(['$stateProvider','$urlRouterProvider','$resourceProvider',routes])

}());
