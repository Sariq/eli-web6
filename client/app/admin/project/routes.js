(function () {

    function routes($stateProvider, $urlRouterProvider) {
        //$urlRouterProvider.when('/projects', '/projects/task/:taskId');
        $stateProvider

            .state('projects', {
                url: '/projects',
                templateUrl: 'project/project.html',
                controller: 'TreeViewController',
                controllerAs: 'tree'

            })
         .state('projects.task', {
             url: '/task/:taskId',
             templateUrl: 'project/views/task.html',
             controller: 'ProjectTaskController',
             controllerAs: 'task'

         })

            

    }
    angular.module('eli.admin')
      .config(['$stateProvider', '$urlRouterProvider', routes])

}());
