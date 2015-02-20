(function () {
                                                                                                                              
    function MailAdmin($resource, localStorageService) {
    var self = this;
    self.mail = '';




    self.create = function(){
        self.mail = {
            "fromUser": [
            "456",
            "Sari"
            ],
            "toUser": [
                "222",
                "ad"
            ],
            "subject": "subject77",
            "content": "content77",
           
            "isRead": true,
            "isStar": true,
            "isDelete": true
        };
       // self.mail = new self.mailResource(mail)
        return self.mail;
    };


    return self;



  }

    angular.module('eli.admin')
    .service('MailAdmin', ['$resource', 'localStorageService', MailAdmin])
}());