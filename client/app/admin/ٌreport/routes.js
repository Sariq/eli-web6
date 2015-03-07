(function () {

    function routes($stateProvider,$urlRouterProvider) {
        $stateProvider
      .state('report', {
        url:'/report' ,
        templateUrl: 'report/report.html',
        controller: 'ChatController',
        controllerAs: 'chat'

      })  
     
  }
  angular.module('eli.admin')
    .config(['$stateProvider','$urlRouterProvider',routes])

}());
