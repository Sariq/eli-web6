(function () {
    function NavCtrl(AuthService, $scope, $rootScope, $http, $timeout, ReminderService, $location) {
    var self = this;
    console.log("nav2");
    $scope.reminderCounter = 0;
    self.user = AuthService.getUserInfo();
    $scope.userInfo = AuthService.getUserInfo()
   	  $scope.$on('authLoaded', function() {
       $scope.userInfo=AuthService.getUserInfo()

       //console.log( $scope.userInfo)


  });


   	  $scope.logOut = function () {
       	 $rootScope.$broadcast("logOut");

   	  }
   	  $scope.setIsRead = function (reminder) {
   	      //reminder.isApproved = true;
   	      ReminderService.update(reminder);
   	      $scope.reminderCounter--;
   	      ReminderService.setTaskId(reminder.dataId)
   	     
   	      $location.path('/projects/task/' + reminder.title);
   	      

   	  }

   	  
   	 
        $scope.getReminders=function(){
            $scope.reminderListPromise = ReminderService.getRemindersByIds(AuthService.getUserInfo().reminders);
            $scope.reminderListPromise.then(function (response) {
                console.log('getReminderList')
                $scope.reminderList = response.data;
                $scope.reminderCounter=0;
                var endTime = new Date()
                for (var i = 0; i < response.data.length; i++) {
                    var difference = new Date((parseInt(response.data[i].reminderTime.substr(6)))) - endTime.getTime();
                    if (difference > 0) {
                        response.data[i].remindeMe = $timeout(function () {
                            $scope.reminderCounter++;
                            alert('My  Reminder at ' + difference)
                        }, difference)
                    } else {
                        if (!response.data[i].isApproved) {
                            $scope.reminderCounter++;
                        }
                    }
                }
                console.log(response.data)

            });
        }
       // $scope.getReminders();
        $scope.$on('newReminder', function () {
            $scope.getReminders();

        });
   	 
      //      var endTime = new Date()
      //      for (var i = 0; i < $scope.reminderList.length; i++) {
      //          var difference = new Date((parseInt($scope.reminderList[i].reminderTime.substr(6)))) - endTime.getTime();
      //          if (difference > 0) {
      //              $scope.reminderList[i].remindeMe = $timeout(function () {
      //                  $scope.reminderCounter++;
      //                  alert('My  Reminder at ' + difference)
      //              }, difference)
      //          } else {
      //              if (!$scope.reminderList[i].isApproved) {
      //                  $scope.reminderCounter++;
      //              }
      //          }
      //      }
      //      console.log($scope.reminderList)


   	  //console.log($scope.test)
   	  //$http({
   	  //    url: '/UserService.svc/GetAllNotApprovedRemindersOfUser',
   	  //    method: 'POST',
   	  //    data: self.user._id
   	  //}).then(function (response) {
   	  //    console.log('getReminderList')
   	  //    console.log(response.data)
   	  //    //response.data[i].remindeMe = [];
   	  //    $scope.reminderList = response.data;
   	  //    var endTime = new Date()
   	  //    for (var i = 0; i < response.data.length; i++) {
   	  //        var difference = new Date((parseInt(response.data[i].reminderTime.substr(6)))) - endTime.getTime();
   	  //        if (difference > 0) {
   	  //            response.data[i].remindeMe = $timeout(function () {
   	  //                $scope.reminderCounter++;
   	  //                alert('My  Reminder at ' + difference)
   	  //            }, difference)
   	  //        } else {
   	  //            if (!response.data[i].isApproved) {
   	  //                $scope.reminderCounter++;
   	  //            }
   	  //        }
   	  //    }
   	  //    console.log(response.data)
   	  //    //alert(difference)
   	  //}, function () { alert("getReminderList error") });

  }

  angular.module('eli.admin')
    .controller('NavCtrl', ['AuthService', '$scope', '$rootScope','$http','$timeout','ReminderService','$location', NavCtrl]);
}());
