
(function () {


    function routes($stateProvider, $urlRouterProvider, $resourceProvider) {

        $stateProvider
       .state('main', {
           url: '/main',
           templateUrl: 'client/app/main/views/main.html',
           controller: 'MainCtrl',
           controllerAs: 'main'

       })
        $urlRouterProvider.otherwise('/');
    }
    angular.module('eliApp')
      .config(['$stateProvider', '$urlRouterProvider', '$resourceProvider', routes])

}());
