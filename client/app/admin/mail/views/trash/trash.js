(function () {
    /** User Controller
     *
     * @param $location:
     * @param UserAdmin: Service
     * @constructor
     */
    function TrashCtrl($location, $scope, MailService, $stateParams, $http, AuthService, MailService, UserAdmin, $rootScope) {
        var self = this;
        self.userList = MailService.getUserList();
        self.pageIdx = 0;
        $scope.$on('CatMailMessages', function () {

            self.messages = MailService.getTrashMessages();

        });
        self.messages = MailService.getTrashMessages();



        self.selectAll = function () {
            angular.forEach(self.messages, function (value, key) {
                value.isChecked = self.allIsChecked;
            })
        }


    }

    angular.module('eli.admin')
        .controller('TrashCtrl', ['$location', '$scope', 'MailService', '$stateParams', '$http', 'AuthService', 'MailService', 'UserAdmin', '$rootScope', TrashCtrl]);
}());










