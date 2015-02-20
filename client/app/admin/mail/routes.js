(function () {

    function routes($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/mail', '/mail/inbox');
        $stateProvider
      .state('#/mail', {
          url: '/mail',
          abstract: true,
        templateUrl: 'mail/views/mail.html',
        controller: '',
        controllerAs: ''

      })

          .state('#/mail.mail_compose', {
              url: '/mail_compose',
              templateUrl: 'mail/views/mail_compose.html',
              controller: 'MailComposeController',
              controllerAs: 'send'

          })
         .state('#/mail.inbox', {
             url: '/inbox',
             templateUrl: 'mail/views/inbox.html',
             controller: '',
             controllerAs: ''

         })
              
         
     
  }
  angular.module('eli.admin')
    .config(['$stateProvider','$urlRouterProvider',routes])

}());
