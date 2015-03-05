(function () {
    /** User Controller
     *
     * @param $location:
     * @param UserAdmin: Service
     * @constructor
     */
    function MailMessageCtrl($location, $scope, $stateParams, $http, AuthService, MailService, UserAdmin) {
        var self = this;
        self.userName = '';
        self.userList = UserAdmin.getUserList();
        //self.mailMessage.$save(function (response) {
        //    console.log(response);

        //});
       // console.log(self.user._id)

        
        self.message = MailService.getCurMessage();
    





    }

    angular.module('eli.admin')
        .controller('MailMessageCtrl', ['$location', '$scope', '$stateParams', '$http', 'AuthService','MailService','UserAdmin', MailMessageCtrl]);
}());










