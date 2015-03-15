
(function () {


  function routes($stateProvider, $urlRouterProvider,$resourceProvider) {
        
      $stateProvider
      .state('/task_modal', {
          templateUrl: 'views/add/add.html',
          controller: 'TaskModalInstanceCtrl'


      })
   

  }
  angular.module('eli.common')
    .config(['$stateProvider','$urlRouterProvider','$resourceProvider',routes])

}());
