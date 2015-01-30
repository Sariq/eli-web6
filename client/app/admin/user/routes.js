(function () {

    function routes($stateProvider,$urlRouterProvider) {
        $stateProvider
      .state('users', {
        url:'/users' ,
        templateUrl : 'user/views/list/list.html',
        controller: 'UserListController',
        controllerAs: 'list'

      })  
             $stateProvider
      .state('/user/profile/:userId', {
          url: '/user/profile/:userId',
          templateUrl: 'users/views/profile/profile.html',
          controller: 'UserProfileController',
          controllerAs: 'profile'

      })      
      .state('#/user/add', {
          url: '/user/add',
          templateUrl: 'user/views/add/add.html',
        controller: 'UserAddController',
        controllerAs: 'add'

      })
        .state('#/user/add/:userId/:meetingId', {
            url: '/user/add/:userId/:meetingId',
            templateUrl: 'users/views/add/add.html',
            controller: 'UserAddController',
            controllerAs: 'add'

        })
      .state('user/edit/:userId', {
          url: '/user/edit/:userId',
          templateUrl: 'user/views/add/add.html',
        controller: 'UserAddController',
        controllerAs: 'add'
      })
     
  }
  angular.module('eli.admin')
    .config(['$stateProvider','$urlRouterProvider',routes])

}());
