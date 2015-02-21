(function () {

    function routes($stateProvider,$urlRouterProvider) {
        $stateProvider
      .state('contactUs', {
          url: '/contactUs',
          templateUrl: 'contactUs/contactUs.html',
        controller: '',
        controllerAs: ''

      })



     
  }
    angular.module('eliApp')
    .config(['$stateProvider','$urlRouterProvider',routes])

}());


