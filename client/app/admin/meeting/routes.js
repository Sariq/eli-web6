(function () {

    function routes($stateProvider,$urlRouterProvider) {
        $stateProvider
      .state('#/meetings', {
        url:'/meetings' ,
        templateUrl: 'meeting/views/list/list.html',
        controller: 'MeetingListController',
        controllerAs: 'list'

      })
              
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
                .state('meeting/item/:meetingId', {
                    url: '/meeting/item/:meetingId',
                    templateUrl: 'meeting/views/item/item.html',
                    controller: 'MeetingItemController',
                    controllerAs: 'item'

                })
           .state('meeting/add/:patientId', {
               url: '/meeting/add/:patientId',
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
