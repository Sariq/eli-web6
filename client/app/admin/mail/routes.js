(function () {

    function routes($stateProvider, $urlRouterProvider) {
       $urlRouterProvider.when('/mail', '/mail/inbox');
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
              controllerAs: 'compose'

          })
         .state('mail.inbox', {
             url: '/inbox',
             templateUrl: 'mail/views/inbox/inbox.html',
             controller: 'InboxCtrl',
             controllerAs: 'inbox'

         })    
            .state('mail.mail_message', {
                url: '/mail_message',
                templateUrl: 'mail/views/mail_message/mail_message.html',
                controller: 'MailMessageCtrl',
                controllerAs: 'mailMessage'

            })

         .state('mail.sent', {
             url: '/sent',
             templateUrl: 'mail/views/sent/sent.html',
             controller: 'SentCtrl',
             controllerAs: 'sent'

         })
          .state('mail.trash', {
              url: '/trash',
              templateUrl: 'mail/views/trash/trash.html',
              controller: 'TrashCtrl',
              controllerAs: 'trash'

          })
             .state('mail.important', {
                 url: '/important',
                 templateUrl: 'mail/views/important/important.html',
                 controller: 'ImportantCtrl',
                 controllerAs: 'important'

             })

     
  }
  angular.module('eli.admin')
    .config(['$stateProvider','$urlRouterProvider',routes])

}());
