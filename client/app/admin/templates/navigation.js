(function () {
    function NavCtrl(AuthService, $scope, $rootScope, $http, $timeout, ReminderService, $location, MailService, $interval, UserAdmin, TaskgAdmin, $modal) {
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
            reminder.isApproved = true;

            ReminderService.update(reminder);
            $scope.reminderCounter--;
            ReminderService.setTaskId(reminder.dataId);
            self.taskItem = TaskgAdmin.get(reminder.dataId);
            self.showTask(self.taskItem)
          //  $location.path('/projects/task/' + reminder.title);
        }

        self.showTask = function (assignment) {
            //MeetingAdmin.addTask(self.meeting);

            console.log('TaskModalService.openModal');
            var modalInstance = $modal.open({
                templateUrl: '../admin/partials/task_modal/views/content/content.html',
                controller: 'TaskModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    data: function () {
                        return { data: assignment };
                    }
                }
            });
        }

        $scope.setIsReadTask = function (task) {
            task.isDone = true;
            $scope.taskCounter--;
            ReminderService.setTaskId(task.idInProject)
            TaskgAdmin.update(task)
            self.showTask(task)
            //$location.path('/projects/task/' + task.title);
        }

        $scope.setIsReadMailMessage = function (message) {
            $scope.inboxCounter--;
            message.isRead = true;
            MailService.setCurMessage(message);
            $scope.currMessage = UserAdmin.fromUserToId(message)
         
            //MailService.update(message);
            $http.post('/MailMessageService.svc/UpdateMailMessages', [$scope.currMessage]).
            success(function (data, status, headers, config) {
               
            }).error(function (data, status, headers, config) { });
           
            $location.path('/mail/mail_message');
        }

   
        //Get MailMeesages
        $scope.getMailMessages = function () {
            $scope.inBoxMessages = [];
            $scope.inboxCounter = 0;
            $scope.mailMessagesPromise = MailService.getMailMessagesHttp($scope.userInfo._id);
            if ($scope.mailMessagesPromise) {
                $scope.mailMessagesPromise.then(function (response) {
                  
                    //console.log("Service before IN-Response")
                    //console.log(response.data)
                    //console.log("IN-Response")
                    //console.log(response.data)
                
                   // MailService.setMailMessages(response.data);
                    $scope.inBoxMessages =[];
                   

                   // alert(response.data)
                    angular.forEach(response.data, function (value, key) {
                             
                            if (!value.isDelete && value.fromUser[0] != self.user._id) {
                                if (!value.isRead) { 
                                    $scope.inboxCounter++;
                              
                                $scope.inBoxMessages.push(value);
                            }
                            }

                        
                    });

                    //$timeout(function () {
                    //    $rootScope.$broadcast("mailMessagesFromService");
                    //}, 60000)

                });
            }
        }
        $scope.myTest = function () {
            $scope.getMailMessages();

        }
        $scope.getMailMessages();
        //$interval(function () {
        //    $scope.getMailMessages();

        //}, 9000)
        //60000
        //Get Tasks
        $scope.getTasks = function () {
            console.log($scope.userInfo)
            $http({
                url: '/AssignmentService.svc/getAssignmentsByIds',
                method: 'POST',
                data: $scope.userInfo.projectAassignments
            }).then(function (response) {

                $scope.taskList = response.data;
                $scope.taskCounter = $scope.taskList.length;
                console.log("$scope.taskList")
                console.log($scope.taskList)

            }, function () { alert("getAssignmentsByIds edit error") });
        }
        if ($scope.userInfo.projectAassignments != null) {
            console.log($scope.userInfo.projectAassignments)
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
        $scope.getReminders();
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
      .controller('NavCtrl', ['AuthService', '$scope', '$rootScope', '$http', '$timeout', 'ReminderService', '$location', 'MailService', '$interval','UserAdmin','TaskgAdmin','$modal', NavCtrl]);
}());
