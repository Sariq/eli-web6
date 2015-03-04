(function () {
    /** User Controller
     *
     * @param $location:
     * @param UserAdmin: Service
     * @constructor
     */
    function MailComposeCtrl($location, $scope, MailComposeService, $stateParams, $http, AuthService, $q, UserAdmin) {
        var self = this;
        self.tagArr = [];
        $scope.mailMessage = MailComposeService.create();
        console.log($scope.mailMessage)
        self.user = AuthService.getUserInfo();
        $scope.sendMessage = function () {
            alert()
            $scope.mailMessage.fromUser.push(self.user._id)
            $scope.mailMessage.$save(function (response) {
            console.log(response);
       
          
        });
        }
 
        self.tagArrs = MailComposeService.getUserList();
        for (var i = 0; i < self.tagArrs.length; i++) {
      
            self.tagArr.push({ userId: self.tagArrs[i]._id, text: self.tagArrs[i].userId })
        }
       
        //self.tagArr = [{ userId: "1", text: "test1" }]
        //self.tempTags.$promise.then(function (result) {
        //    console.log(result);
         
        //});

        $scope.log = [];
        $scope.loadTags = function (query) {
            var deferred = $q.defer();
            var i;
            // here we do filter with the current text

            var result = [];

           // var a = [{ userId: "1", text: "test1" }];
            for (i = 0; i < self.tagArr.length; i++) {

                // var jsonStr=a[i];
                // var json_parsed = JSON.parse(jsonStr);

                var items = self.tagArr[i].text; // an array
                var item = items.toLowerCase();
                var quer = query.toLowerCase();
                if (item.indexOf(quer) > -1) {
                    result.push(self.tagArr[i]);
                }// is the respective value
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
        .controller('MailComposeCtrl', ['$location', '$scope', 'MailComposeService', '$stateParams', '$http', 'AuthService','$q','UserAdmin', MailComposeCtrl]);
}());










