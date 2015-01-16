(function () {

    function routes($stateProvider,$urlRouterProvider) {
        $stateProvider
      .state('meetings', {
        url:'/meetings' ,
        templateUrl: 'meeting/views/list/list.html',
        controller: 'MeetingListController',
        controllerAs: 'list'

      })
              
      .state('meeting/add', {
          url: '/meeting/add',
          templateUrl: 'meeting/views/add/add.html',
          controller: 'MeetingAddController',
        controllerAs: 'add'

      })
      .state('meeting/edit/:meetingId', {
          url: '/meeting/edit/:meetingId',
          templateUrl: 'meeting/views/add/add.html',
        controller: 'MeetingAddController',
        controllerAs: 'add'
      })
     
  }
  angular.module('eli.admin')
    .config(['$stateProvider','$urlRouterProvider',routes])

}());
