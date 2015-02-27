(function () {
    /** User Controller
     *
     * @param $location:
     * @param UserAdmin: Service
     * @constructor
     */
    function MailComposeCtrl($location, $scope, MailComposeService, $stateParams, $http, AuthService) {
        var self = this;
        self.mailMessage = MailComposeService.create();
        console.log(self.mailMessage)
        self.user = AuthService.getUserInfo();
        self.sendMessage = function () { 
        self.mailMessage.$save(function (response) {
            console.log(response);

        });
        }
 









    }

    angular.module('eli.admin')
        .controller('MailComposeCtrl', ['$location', '$scope', 'MailComposeService', '$stateParams', '$http', 'AuthService', MailComposeCtrl]);
}());










