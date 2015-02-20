(function () {
    /** Patient Controller
     *
     * @param $location:
     * @param PatientAdmin: Service
     * @constructor
     */
    function MailComposeController($http,$location, $scope, MailAdmin, $stateParams) {
        var self = this;
        self.error = '';
        self.debug = '';
        self.isNew = false;
        self.message = MailAdmin.create()
        self.sendMail = function () {
            console.log(self.message)
            alert(angular.toJson(self.message))
            $http({
                url: '/TestService.svc/SendMailMessage',
                method: 'POST',
                data: "self.message"
            }).then(function (response) {

                alert("yes")


            }, function () { alert("SendMailMessage error") });
        };

    }

    angular.module('eli.admin')
        .controller('MailComposeController', ['$http', '$location', '$scope', 'MailAdmin', '$stateParams', MailComposeController]);
}());










