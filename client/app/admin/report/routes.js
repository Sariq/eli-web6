(function () {

    function routes($stateProvider,$urlRouterProvider) {
        $stateProvider
      .state('report/add', {
          url: '/report/add',
        templateUrl: 'report/views/add/add.html',
        controller: 'ChatController',
        controllerAs: 'chat'

      })
              .state('report/list', {
                  url: '/report/list',
                  templateUrl: 'report/views/list/list.html',
                  controller: 'ReportListCtrl',
                  controllerAs: 'list'

              })
     
  }
  angular.module('eli.admin')
    .config(['$stateProvider','$urlRouterProvider',routes])

}());
