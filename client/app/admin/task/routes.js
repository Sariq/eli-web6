(function () {

    function routes($stateProvider,$urlRouterProvider) {
        $stateProvider
      .state('tasks', {
        url:'/tasks' ,
        templateUrl: 'task/views/list/list.html',
        controller: 'TasktListController',
        controllerAs: 'list'

      })
              
      .state('task/add', {
          url: '/task/add',
          templateUrl: 'task/views/add/add.html',
          controller: 'TaskAddController',
        controllerAs: 'add'

      })
      .state('task/edit/:patientId', {
          url: '/task/edit/:patientId',
          templateUrl: 'task/views/add/add.html',
        controller: 'TaskAddController',
        controllerAs: 'add'
      })
     
  }
  angular.module('eli.admin')
    .config(['$stateProvider','$urlRouterProvider',routes])

}());
