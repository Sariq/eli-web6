(function () {

    function routes($stateProvider,$urlRouterProvider) {
        $stateProvider
      .state('chat', {
        url:'/chat' ,
        templateUrl : 'chat/views/chat.html',
        controller: 'ChatController',
        controllerAs: 'chat'

      })  
     
  }
  angular.module('eli.admin')
    .config(['$stateProvider','$urlRouterProvider',routes])

}());
