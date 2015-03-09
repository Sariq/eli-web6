(function () {

    function routes($stateProvider,$urlRouterProvider) {
        $stateProvider
      .state('chat', {
        url:'/chat' ,
        templateUrl : 'chat/views/chat.html',
        controller: 'ChatController',
        controllerAs: 'chat'

      })
            .state('report', {
                url: '/report/report.html',
                templateUrl: 'report/report.html',
                controller: '',
                controllerAs: ''

            })
     
  }
  angular.module('eli.admin')
    .config(['$stateProvider','$urlRouterProvider',routes])

}());
