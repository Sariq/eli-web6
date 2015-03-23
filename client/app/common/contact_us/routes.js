(function () {

    function routes($stateProvider, $urlRouterProvider) {
       // $urlRouterProvider.when('/meeting/item/:meetingId/:index', '/meeting/item/:meetingId/:index/assignments');

        $stateProvider
       .state('contactUs/list', {
           url: '/contactUs/list',
           templateUrl: '../common/contact_us/views/list/list.html',
           controller: 'ContactUsListController',
           controllerAs: 'list'
       })
      .state('contactUs/add', {
          url: '/contactUs/add',
          templateUrl: 'contactUs/contactUs.html',
          controller: 'ContactUsAddController',
          controllerAs: 'add'
      })
   
     .state('contactUs/edit/:contactUsId', {
         url: '/meeting/edit/:contactUsId',
         templateUrl: '../common/contact_us/views/add/add.html',
         controller: 'ContactUsAddController',
         controllerAs: 'add'
     })

          .state('contactUs/item/:contactUsId', {
              url: '/contactUs/item/:contactUsId',
              templateUrl: '../common/contact_us/views/item/item.html',
              controller: 'ContactUsItemController',
              controllerAs: 'item'
          })

    }
    angular.module('eli.common')
      .config(['$stateProvider', '$urlRouterProvider', routes])

}());
