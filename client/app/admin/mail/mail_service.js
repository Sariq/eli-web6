(function () {

    function MailService($resource, localStorageService, $http, $rootScope) {
        var self = this;
        self.userList = [];
      

        self.mailResource = $resource('/MailMessageService.svc/api/:id', {},
          { update: { method: 'PUT' } }
        );
        //Inbox
        self.setInboxMessages = function (inboxMessages) {
            
            self.inboxMessages = inboxMessages;
        }
        self.getInboxMessages = function () {
            return self.inboxMessages;
        }
        self.update = function (message) {
            self.mailResource.update(message);
        }
        //Sent
        self.setSentMessages = function (sentMessages) {

            self.sentMessages = sentMessages;
        }
        self.getSentMessages = function () {
            return self.sentMessages;
        }

        //trash
        self.setTrashMessages = function (trashMessages) {

            self.trashMessages = trashMessages;
        }
        self.getTrashMessages = function () {
            return self.trashMessages;
        }

        //important
        self.setStarMessages = function (starMessages) {

            self.starMessages = starMessages;
        }
        self.getStarMessages = function () {
            return self.starMessages;
        }


        //DeleteMssages
        self.deleteMessages = function (messages) {

            var tmpDelArr = [];
            angular.forEach(messages, function (value, key) {
                if (value.isChecked) {
                    tmpDelArr.push(value._id)
                }
            });

            $http.post('/MailMessageService.svc/DeleteMailMessagesFromInbox', tmpDelArr).
            success(function (data, status, headers, config) {
                $rootScope.$broadcast("mailMessagesFromHttp");
            }).error(function (data, status, headers, config) { });
        }
        //Set Current Message
        
        self.setCurMessage = function (message) {
            localStorageService.set("CurrMessage", message);

        }
        self.getCurMessage = function () {

            return localStorageService.get("CurrMessage");
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

        self.getMailMessagesHttp = function (userId) {
            if (userId != null) {
                var promise = $http({
                    url: '/MailMessageService.svc/GetInboxMessages',
                    method: 'POST',
                    data: userId
                });
                return promise;
            }
        }

        self.setMailMessages = function (MailMessages) {
            console.log("ServiceTTTTTTTTTTTTTT")
            console.log(MailMessages)
           // alert(angular.toJson(MailMessages))
            self.MailMessages = MailMessages;
        }
        self.getMailMessages = function () {
            return self.MailMessages;
        }

    }

    angular.module('eli.admin')
    .service('MailService', ['$resource', 'localStorageService','$http','$rootScope', MailService])
}());