(function () {

    function routes($stateProvider, $urlRouterProvider) {
        //abstract: true,
       
        //$urlRouterProvider.when('/patient/profile/:patientId', ['$state', '$timeout', function ($state, $timeout) {
        //    alert(angular.toJson($state))
        //    $timeout(function () {
        //        $state.go('profile.meetings');
        //    }, 1000);
        //}]);
       

        $urlRouterProvider.when('/patient/profile/:patientId', '/patient/profile/:patientId/meetings');
        $stateProvider
      .state('patients', {
        url:'/patients' ,
        templateUrl : 'patients/views/list/list.html',
        controller: 'PatientListController',
        controllerAs: 'list'

      })  
          
      .state('profile', {
          url: '/patient/profile/:patientId',
          templateUrl: 'patients/views/profile/profile.html',
          controller: 'PatientProfileController',
          controllerAs: 'profile',
          //onEnter: ['$state', '$timeout', function ($state, $timeout) {
          //    $timeout(function () {
          //        $state.go('profile.meetings')
          //    }, 1000);
          //}]

      })

            .state('profile.inbox', {
                url: '/inbox',
                templateUrl: 'mail/views/inbox.html',
                controller: '',
                controllerAs: ''

            })

     
      .state('profile.meetings', {
          url: '/meetings',
          templateUrl: 'meeting/views/list/list.html',
          controller: 'MeetingListController',
          controllerAs: 'list'

      })


//        $stateProvider
//.state('/patient/profile/:patientId', {
//    url: '/patient/profile/:patientId',
//    views: {
//        'profile': {
//            url: '/patient/profile/:patientId',
//            templateUrl: 'patients/views/profile/profile.html',
//            controller: 'PatientProfileController',
//            controllerAs: 'profile'
//        },
//        'meetings': {
//            templateUrl: 'meeting/views/list/list.html',
//            controller: 'MeetingListController',
//            controllerAs: 'list'
//        },


//    }

//})

  
        

      .state('#/patient/add', {
          url: '/patient/add',
          templateUrl: 'patients/views/add/add.html',
        controller: 'PatientAddController',
        controllerAs: 'add'

      })
        .state('#/patient/add/:patientId/:meetingId', {
            url: '/patient/add/:patientId/:meetingId',
            templateUrl: 'patients/views/add/add.html',
            controller: 'PatientAddController',
            controllerAs: 'add'

        })
      .state('patient/edit/:patientId', {
          url: '/patient/edit/:patientId',
          templateUrl: 'patients/views/add/add.html',
        controller: 'PatientAddController',
        controllerAs: 'add'
      })
     
  }
  angular.module('eli.admin')
    .config(['$stateProvider','$urlRouterProvider',routes])

}());
