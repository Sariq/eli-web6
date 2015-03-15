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

                .state('report/item/:reportId', {
                    url: '/report/item/:reportId',
                    templateUrl: 'report/views/item/item.html',
                    controller: 'ReportItemCtrl',
                    controllerAs: 'item'

                })
                            .state('report/edit/:reportId', {
                                url: '/report/edit/:reportId',
                                templateUrl: 'report/views/add/add.html',
                                controller: 'ChatController',
                                controllerAs: 'chat'
                            })
  }
  angular.module('eli.admin')
    .config(['$stateProvider','$urlRouterProvider',routes])

}());
