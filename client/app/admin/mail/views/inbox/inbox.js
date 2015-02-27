(function () {
    /** User Controller
     *
     * @param $location:
     * @param UserAdmin: Service
     * @constructor
     */
    function InboxCtrl($location, $scope, MailComposeService, $stateParams, $http, AuthService) {
        var self = this;
        self.inboxMessages = [];
      
        self.user=AuthService.getUserInfo();
        //self.mailMessage.$save(function (response) {
        //    console.log(response);

        //});
        console.log(self.user._id)
        $http({
            url: '/MailMessageService.svc/GetInboxMessages',
            method: 'POST',
            data: self.user._id
        }).then(function (response) {
            self.inboxMessages = response.data;
            console.log(response)


        }, function () { alert("GetInboxMessages error") });









    }

    angular.module('eli.admin')
        .controller('InboxCtrl', ['$location', '$scope', 'MailComposeService', '$stateParams', '$http', 'AuthService', InboxCtrl]);
}());










