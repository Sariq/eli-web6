(function () {

    function routes($stateProvider,$urlRouterProvider) {
        $stateProvider
      .state('private', {
          url: '/private',
          templateUrl: 'private/list.html',
        controller: 'PrivateCtrl',
        controllerAs: 'private'

      })  

     
  }
  angular.module('eli.admin')
    .config(['$stateProvider','$urlRouterProvider',routes])

}());
