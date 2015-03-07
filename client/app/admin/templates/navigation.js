(function () {
    function NavCtrl(AuthService, $scope, $rootScope, $http, $timeout, ReminderService, $location, MailService, $interval, UserAdmin) {
        var self = this;
        console.log("nav2");
        $scope.inboxCounter = 0;
        $scope.reminderCounter = 0;
        $scope.taskCounter = 0;
        $scope.inBoxMessages = [];
        self.user = AuthService.getUserInfo();
        $scope.userInfo = AuthService.getUserInfo()
        $scope.$on('authLoaded', function () {
            $scope.userInfo = AuthService.getUserInfo()
        });

        self.userList = UserAdmin.query();
        self.userList.$promise.then(function (result) {
            console.log(result);
            UserAdmin.setUserList(result)
        });

        $scope.logOut = function () {
            $rootScope.$broadcast("logOut");

        }
        $scope.setIsReadReminder = function (reminder) {
            //reminder.isApproved = true;
            ReminderService.update(reminder);
            $scope.reminderCounter--;
            ReminderService.setTaskId(reminder.dataId)
            $location.path('/projects/task/' + reminder.title);
        }

        $scope.setIsReadTask = function (task) {

            $scope.taskCounter--;
            ReminderService.setTaskId(task.idInProject)
            $location.path('/projects/task/' + task.title);
        }

        $scope.setIsReadMailMessage = function (message) {
            MailService.setCurMessage(message);
            $location.path('/mail/mail_message');
        }

        //Get MailMeesages
        $scope.getMailMessages = function () {
            $scope.inBoxMessages = [];
            $scope.inboxCounter = 0;
            $scope.mailMessagesPromise = MailService.getMailMessagesHttp($scope.userInfo._id);
            if ($scope.mailMessagesPromise) {
                $scope.mailMessagesPromise.then(function (response) {
                    MailService.setMailMessages(response.data);
                    $scope.inBoxMessages = response.data;
                    angular.forEach($scope.inBoxMessages, function (value, key) {
                        if (!value.isDelete && value.fromUser[0] != $scope.userInfo._id) {
                            if (!value.isRead)
                                $scope.inboxCounter++;
                        }
                    });

                    $timeout(function () {
                        $rootScope.$broadcast("mailMessagesFromService");
                    }, 60000)

                });
            }
        }
       // $scope.getMailMessages();
        $interval(function () {
            $scope.getMailMessages();

        }, 9000)
        //60000
        //Get Tasks
        $scope.getTasks = function () {
            console.log($scope.userInfo)
            $http({
                url: '/AssignmentService.svc/getAssignmentsByIds',
                method: 'POST',
                data: $scope.userInfo.assignments
            }).then(function (response) {

                $scope.taskList = response.data;
                console.log($scope.taskList)

            }, function () { alert("getAssignmentsByIds edit error") });
        }
        if ($scope.userInfo.assignments != null) {
            $scope.getTasks();
        };
        //Get Reminders
        $scope.getReminders = function () {
            $scope.reminderListPromise = ReminderService.getRemindersByIds(AuthService.getUserInfo().reminders);
            $scope.reminderListPromise.then(function (response) {
                console.log('getReminderList')
                console.log(response.data)
                $scope.reminderList = response.data;
                $scope.reminderCounter = 0;
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
      .controller('NavCtrl', ['AuthService', '$scope', '$rootScope', '$http', '$timeout', 'ReminderService', '$location', 'MailService', '$interval','UserAdmin', NavCtrl]);
}());
