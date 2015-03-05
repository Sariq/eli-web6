(function () {
    /** User Controller
     *
     * @param $location:
     * @param UserAdmin: Service
     * @constructor
     */
    function InboxCtrl($location, $scope,  $stateParams, $http, AuthService, MailService, UserAdmin) {
        var self = this;
        self.allIsChecked = false;
        self.pageIdx = 0;
        self.inboxCounter = 0;
        $scope.$on('CatMailMessages', function () {

            self.messages = MailService.getInboxMessages(); 
       
                angular.forEach(self.messages, function (value, key) {
                    if(!value.isRead){
                        self.inboxCounter++;
                    }
                })
        });
        self.messages = MailService.getInboxMessages();


        self.selectAll = function () {
            angular.forEach(self.messages, function (value, key) {
                value.isChecked = self.allIsChecked;
            })
        }






    }

    angular.module('eli.admin')
        .controller('InboxCtrl', ['$location', '$scope',  '$stateParams', '$http', 'AuthService','MailService','UserAdmin', InboxCtrl]);
}());










