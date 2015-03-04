(function () {
    /** User Controller
     *
     * @param $location:
     * @param UserAdmin: Service
     * @constructor
     */
    function MailCtrl($location, $scope, MailComposeService, $stateParams, $http, AuthService, MailComposeService, UserAdmin) {
        var self = this;
        self.inoxCounter = 0;
        self.userList = MailComposeService.getUserList();
        self.user = AuthService.getUserInfo();
        self.inboxMessages = [];
        self.sentMessages = [];
        self.getInbox = function () { 
        $http({
            url: '/MailMessageService.svc/GetInboxMessages',
            method: 'POST',
            data: self.user._id
        }).then(function (response) {
  
            console.log(response)
            
           
            $location.path('/mail/inbox');
            angular.forEach(response.data, function (value, key) {
                if (!value.isRead)
                    self.inoxCounter++;
                if (!value.isDelete) {
                    self.inboxMessages.push(value);
                } else {
                    self.sentMessages.push(value)
                }
            });
        }, function () { alert("GetInboxMessages error") });
        }
        self.getInbox();
        self.deleteMail = function () {
            var tmpDelArr = [];
            angular.forEach(self.inboxMessages, function (value, key) {
                if (value.isChecked) {
                 
                    tmpDelArr.push(value._id)
                }
            });
            $http({
                url: '/MailMessageService.svc/DeleteMailMessagesFromInbox',
                method: 'POST',
                data: tmpDelArr
            }).then(function (response) {

                self.getInbox();


            }, function () { alert("DeleteMailMessagesFromInbox error") });
        }


    

    }

    angular.module('eli.admin')
        .controller('MailCtrl', ['$location', '$scope', 'MailComposeService', '$stateParams', '$http', 'AuthService', 'MailComposeService', 'UserAdmin', MailCtrl]);
}());










