(function () {

    function routes($stateProvider, $urlRouterProvider) {
       // $urlRouterProvider.when('/meeting/item/:meetingId/:index', '/meeting/item/:meetingId/:index/assignments');

        $stateProvider
       .state('/meetings/:patientId', {
           url: '/meetings/:patientId',
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
      .state('meeting/item/:meetingId/:index', {
          url: '/meeting/item/:meetingId/:index',
          templateUrl: 'meeting/views/item/item.html',
          controller: 'MeetingItemController',
          controllerAs: 'item'
      })
     //.state('meeting/add/:patientId', {
     //    url: '/meeting/add/:patientId',
     //    templateUrl: 'meeting/views/add/add.html',
     //    controller: 'MeetingAddController',
     //    controllerAs: 'add'
     //})
     .state('meeting/edit/:meetingId/:index', {
         url: '/meeting/edit/:meetingId/:index',
         templateUrl: 'meeting/views/add/add.html',
         controller: 'MeetingAddController',
         controllerAs: 'add'
     })

          .state('meeting/item/:meetingId/:index.assignments', {
              url: '/assignments',
              templateUrl: 'task_modal/views/list/list.html',
              controller: '',
              controllerAs: ''
          })

    }
    angular.module('eli.admin')
      .config(['$stateProvider', '$urlRouterProvider', routes])

}());
