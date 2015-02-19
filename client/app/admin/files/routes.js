(function () {

    function routes($stateProvider, $urlRouterProvider) {

        $stateProvider
      .state('#/files', {
          url: '/files',

          templateUrl: 'files/files.html',
        controller: '',
        controllerAs: ''

      })

  }
  angular.module('eli.admin')
    .config(['$stateProvider','$urlRouterProvider',routes])

}());
