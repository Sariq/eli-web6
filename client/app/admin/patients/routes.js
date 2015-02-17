(function () {

    function routes($stateProvider, $urlRouterProvider) {
        //abstract: true,

   
        $stateProvider
      .state('patients', {
        url:'/patients' ,
        templateUrl : 'patients/views/list/list.html',
        controller: 'PatientListController',
        controllerAs: 'list'

      })  
             $stateProvider
      .state('/patient/profile/:patientId', {
          url: '/patient/profile/:patientId',
          
          templateUrl: 'patients/views/profile/profile.html',
          controller: 'PatientProfileController',
          controllerAs: 'profile'

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
