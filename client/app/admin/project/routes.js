(function () {

    function routes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/projects', '/projects/task');
        $stateProvider

            .state('projects', {
                url: '/projects',
                templateUrl: 'project/project.html',
                controller: 'AbnTestController',
                controllerAs: ''

            })
         .state('projects.task', {
             url: '/task',
             templateUrl: 'project/views/task.html',
             controller: 'ProjectTaskController',
             controllerAs: 'project'

         })

            

    }
    angular.module('eli.admin')
      .config(['$stateProvider', '$urlRouterProvider', routes])

}());
