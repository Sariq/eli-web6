(function () {

    function MailComposeService($resource, localStorageService) {
        var self = this;
        self.userList = [];
      

        self.mailResource = $resource('/MailMessageService.svc/api/:id', {},
          { update: { method: 'PUT' } }
        );
        self.setInboxMessages = function (inboxMessages) {
            
            self.inboxMessages = inboxMessages;
        }
        self.getInboxMessages = function () {
            return self.inboxMessages;
        }
        self.setUserList = function (userList) {
            self.userList = userList;
        }
        self.getUserList = function () {
            return self.userList;
        }
        self.create = function () {
            var mailMessage = {
                
    
                fromUser: [
             
                ],
                toUser: [
                  
                ],
                subject: "",
                content: "",
            
                isRead: false,
                isStar: false,
                isDelete: false
            }
            self.mailMessage = new self.mailResource(mailMessage)
            return self.mailMessage;
        };

      



    }

    angular.module('eli.admin')
    .service('MailComposeService', ['$resource', 'localStorageService', MailComposeService])
}());