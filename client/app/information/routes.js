
(function () {


    function routes($stateProvider, $urlRouterProvider, $resourceProvider) {

        $stateProvider
       .state('forParents', {
           url: '/forParents',
           templateUrl: 'information/forParents.html',
           controller: 'LogInCtrl',
           controllerAs: 'logIn'

       })
        $urlRouterProvider.otherwise('/');
    }
    angular.module('eliApp')
      .config(['$stateProvider', '$urlRouterProvider', '$resourceProvider', routes])

}());
