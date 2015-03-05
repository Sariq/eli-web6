(function () {
    /** User Controller
     *
     * @param $location:
     * @param UserAdmin: Service
     * @constructor
     */
    function MailComposeCtrl($location, $scope, MailService, $stateParams, $http, AuthService, $q, UserAdmin, $rootScope, UserAdmin) {
        var self = this;
        self.tagArr = [];
        $scope.mailMessage = MailService.create();
        console.log($scope.mailMessage)
        self.user = AuthService.getUserInfo();
        self.sendMessage = function () {
           
            $scope.mailMessage.fromUser.push(self.user._id)
            $scope.mailMessage.$save(function (response) {
            console.log(response);
            $rootScope.$broadcast("mailMessagesFromHttp");
            $location.path('/mail/inbox')
          
        });
        }
 
        self.tagArrs = UserAdmin.getUserList();
        for (var i = 0; i < self.tagArrs.length; i++) {
            self.tagArr.push({ userId: self.tagArrs[i]._id, text: self.tagArrs[i].userId })
        }


        $scope.log = [];
        $scope.loadTags = function (query) {
            var deferred = $q.defer();
            var i;

            var result = [];

            for (i = 0; i < self.tagArr.length; i++) {
                var items = self.tagArr[i].text; 
                var item = items.toLowerCase();
                var quer = query.toLowerCase();
                if (item.indexOf(quer) > -1) {
                    result.push(self.tagArr[i]);
                }
            }

            deferred.resolve(result);
            return deferred.promise;
        };

        $scope.tagAdded = function (tag) {
            $scope.mailMessage.toUser.push(tag.userId);
            
        };

        $scope.tagRemoved = function (tag) {
            var x = $scope.log.indexOf(tag.tagId);
            $scope.mailMessage.toUser.splice(x, tag.tagId);
        };






    }

    angular.module('eli.admin')
        .controller('MailComposeCtrl', ['$location', '$scope', 'MailService', '$stateParams', '$http', 'AuthService','$q','UserAdmin','$rootScope','UserAdmin', MailComposeCtrl]);
}());










