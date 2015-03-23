(function () {

    function routes($stateProvider,$urlRouterProvider) {
        $stateProvider
      .state('contactUs', {
          url: '/contactUs',
          templateUrl: 'contactUs/contactUs.html',
          controller: 'ContactUsAddController',
          controllerAs: 'contactUs'

      })



     
  }
    angular.module('eliApp')
    .config(['$stateProvider','$urlRouterProvider',routes])

}());


