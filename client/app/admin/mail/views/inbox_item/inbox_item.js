(function () {
    /** User Controller
     *
     * @param $location:
     * @param UserAdmin: Service
     * @constructor
     */
    function InboxCtrl($location, $scope, MailComposeService, $stateParams, $http, AuthService, MailComposeService, UserAdmin) {
        var self = this;
        
        
        //self.mailMessage.$save(function (response) {
        //    console.log(response);

        //});
       // console.log(self.user._id)









    }

    angular.module('eli.admin')
        .controller('InboxCtrl', ['$location', '$scope', 'MailComposeService', '$stateParams', '$http', 'AuthService','MailComposeService','UserAdmin', InboxCtrl]);
}());










