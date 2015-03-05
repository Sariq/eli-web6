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
        self.userList = MailService.getUserList();
        //self.mailMessage.$save(function (response) {
        //    console.log(response);

        //});
       // console.log(self.user._id)

        
        self.message = MailService.getCurMessage();
        console.log(self.message)

        for (var i = 0; i < self.message.fromUser.length; i++)
        {
            for (var j = 0; j < self.userList.length; j++) {
                if (self.message.fromUser[i] === self.userList[j]._id) {
                    self.message.fromUser[i] = self.userList[j].userId;
                }
            }
        }





    }

    angular.module('eli.admin')
        .controller('MailMessageCtrl', ['$location', '$scope', '$stateParams', '$http', 'AuthService','MailService','UserAdmin', MailMessageCtrl]);
}());










