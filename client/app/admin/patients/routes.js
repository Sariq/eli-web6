(function () {

    function routes($stateProvider,$urlRouterProvider) {
        $stateProvider
      .state('patients', {
        url:'/patients' ,
        templateUrl : 'patients/views/list/list.html',
        controller: 'PatientListController',
        controllerAs: 'list'

      })
              
      .state('patient/add', {
          url: '/patient/add',
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
