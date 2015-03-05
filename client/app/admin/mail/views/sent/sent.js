(function () {
    /** User Controller
     *
     * @param $location:
     * @param UserAdmin: Service
     * @constructor
     */
    function SentCtrl($location, $scope, MailService, $stateParams, $http, AuthService, MailService, UserAdmin, $rootScope) {
        var self = this;
        self.allIsChecked = false;
        self.pageIdx = 0;


        $scope.$on('CatMailMessages', function () {

            self.messages = MailService.getSentMessages();

        });
        self.messages = MailService.getSentMessages();



        self.selectAll = function () {
            angular.forEach(self.messages, function (value, key) {
                value.isChecked = self.allIsChecked;
            })
        }








    }

    angular.module('eli.admin')
        .controller('SentCtrl', ['$location', '$scope', 'MailService', '$stateParams', '$http', 'AuthService', 'MailService', 'UserAdmin', '$rootScope', SentCtrl]);
}());










