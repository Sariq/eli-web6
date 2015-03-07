(function () {

    function routes($stateProvider, $urlRouterProvider) {
        $stateProvider
       .state('navigation', {
           url: '/navigation',
           templateUrl: 'templates/navigation.html',
           controller: 'NavCtrl',
           controllerAs: 'NavCtrl'
       })
     .state('dashboard', {
         url: '/',
         templateUrl: 'partials/dashboard.html',
     })
      .state('logIn', {
          url: '/logIn',
          templateUrl: 'auth/views/logIn/logIn.html',
          controllerAs: 'logIn'
      })

        $urlRouterProvider.otherwise('/');

    }
    angular.module('eli.admin')
      .config(['$stateProvider', '$urlRouterProvider', routes])
}());
