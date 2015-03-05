(function () {
    /** User Controller
     *
     * @param $location:
     * @param UserAdmin: Service
     * @constructor
     */
    function ImportantCtrl($location, $scope, MailService, $stateParams, $http, AuthService, MailService, UserAdmin, $rootScope) {
        var self = this;
        self.allIsChecked = false;
        self.pageIdx = 0;


        $scope.$on('CatMailMessages', function () {

            self.messages = MailService.getStarMessages();

        });
        self.messages = MailService.getStarMessages();
        console.log(self.messages)


        self.selectAll = function () {
            angular.forEach(self.messages, function (value, key) {
                value.isChecked = self.allIsChecked;
            })
        }








    }

    angular.module('eli.admin')
        .controller('ImportantCtrl', ['$location', '$scope', 'MailService', '$stateParams', '$http', 'AuthService', 'MailService', 'UserAdmin', '$rootScope', ImportantCtrl]);
}());










