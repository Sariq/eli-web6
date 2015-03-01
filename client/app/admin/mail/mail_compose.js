(function () {

    function MailComposeService($resource, localStorageService) {
        var self = this;

      

        self.mailResource = $resource('/MailMessageService.svc/api/:id', {},
          { update: { method: 'PUT' } }
        );

      

        self.create = function () {
            var mailMessage = {
                
    
                fromUser: [
                    "123",
                    "karin"
                ],
                toUser: [
                    "123",
                    "54f221f73f21e50c9c969240"
                ],
                subject: "subject",
                content: "content",
            
                isRead: true,
                isStar: true,
                isDelete: true
            }
            self.mailMessage = new self.mailResource(mailMessage)
            return self.mailMessage;
        };

      



    }

    angular.module('eli.admin')
    .service('MailComposeService', ['$resource', 'localStorageService', MailComposeService])
}());