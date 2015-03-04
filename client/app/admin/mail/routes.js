(function () {

    function routes($stateProvider, $urlRouterProvider) {
      // $urlRouterProvider.when('/mail', '/mail/inbox');
        $stateProvider
      .state('mail', {
          url: '/mail',
      
        templateUrl: 'mail/views/mail/mail.html',
        controller: 'MailCtrl',
        controllerAs: 'mail'

      })

          .state('mail.mail_compose', {
              url: '/mail_compose',
              templateUrl: 'mail/views/mail_compose/mail_compose.html',
              controller: 'MailComposeCtrl',
              controllerAs: ''

          })
         .state('mail.inbox', {
             url: '/inbox',
             templateUrl: 'mail/views/inbox/inbox.html',
             controller: 'InboxCtrl',
             controllerAs: 'inbox'

         })    
            .state('mail.inbox.inbox_item', {
                url: '/inbox_item',
                templateUrl: 'mail/views/inbox_item/inbox_item.html',
                controller: '',
                controllerAs: ''

            })   
         
     
  }
  angular.module('eli.admin')
    .config(['$stateProvider','$urlRouterProvider',routes])

}());
