(function () {

    function routes($stateProvider, $urlRouterProvider) {
        //$urlRouterProvider.when('/projects', '/projects/task/:taskId');
        $stateProvider

            .state('item/:projectId', {
                url: '/item/:projectId',
                templateUrl: 'project/views/project/project.html',
                controller: 'TreeViewController',
                controllerAs: 'tree'

            })
         .state('item/:projectId.edit', {
             url: '/edit/:taskId',
             templateUrl: 'project/views/task/views/add/add.html',
             controller: 'ProjectTaskController',
             controllerAs: 'task'

         })
                .state('item/:projectId.add', {
                    url: '/add',
                    templateUrl: 'project/views/task/views/add/add.html',
                    controller: 'ProjectTaskController',
                    controllerAs: 'task'

                })

                   .state('item/:projectId.item', {
                       url: '/item/:taskId',
                       templateUrl: 'project/views/task/views/item/item.html',
                       controller: 'ProjectTaskController',
                       controllerAs: 'task'

                   })
                .state('project/list', {
                    url: '/project/list',
                    templateUrl: 'project/views/list/list.html',
                    controller: 'ProjectListController',
                    controllerAs: 'list'

                })
            .state('project/add', {
                url: '/project/add',
                templateUrl: 'project/views/add/add.html',
                controller: 'ProjectAddController',
                controllerAs: 'add'

            })
   

            

    }
    angular.module('eli.admin')
      .config(['$stateProvider', '$urlRouterProvider', routes])

}());
