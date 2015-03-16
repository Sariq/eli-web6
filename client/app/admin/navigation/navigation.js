(function () {
    function NavCtrl(AuthService, $scope, $rootScope, $timeout, ReminderService, $location, MailService, $interval, UserAdmin, TaskgAdmin, $modal, RoleService, TaskAdmin) {
        var self = this;
        $scope.inboxCounter = 0;
        $scope.reminderCounter = 0;
        $scope.taskCounter = 0;
        $scope.inBoxMessages = [];

        //Get role List
        self.roleList = RoleService.query();
        self.roleList.$promise.then(function (response) { RoleService.setRoleList(response) })

        self.user = AuthService.getUserInfo();
        $scope.userInfo = AuthService.getUserInfo()
        //On Auth Loaded
        $scope.$on('authLoaded', function () {
            $scope.userInfo = AuthService.getUserInfo()
        });

        //Get user list
        self.userList = UserAdmin.query();
        self.userList.$promise.then(function (result) {
            UserAdmin.setUserList(result)
        });

        //LogOut
        $scope.logOut = function () {
            $rootScope.$broadcast("logOut");
        }

        //Set isRead Reminder
        $scope.setIsReadReminder = function (reminder) {
            reminder.isApproved = true;
            ReminderService.reminderResource.update(reminder);
            $scope.reminderCounter--;
            ReminderService.setTaskId(reminder.dataId);
            self.taskItem = TaskgAdmin.get(reminder.dataId);
            self.showTask(self.taskItem)
        }

        //Set isRead Task
        $scope.setIsReadTask = function (task) {
            task.isDone = true;
            $scope.taskCounter--;
            ReminderService.setTaskId(task.idInProject)
            TaskgAdmin.update(task)
            self.showTask(task)
        }

        //Set isRead MailMessage
        $scope.setIsReadMailMessage = function (message) {
            $scope.inboxCounter--;
            message.isRead = true;
            MailService.setCurMessage(message);
            $scope.currMessage = UserAdmin.fromUserToId(message)
            MailService.mailResource.UpdateMailMessages([$scope.currMessage]).$promise.then(function () {
            })
            $location.path('/mail/mail_message');
        }

        //Task Modal
        self.showTask = function (assignment) {
            var modalInstance = $modal.open({
                templateUrl: '../admin/task_modal/views/content/content.html',
                controller: 'TaskModalItemCtrl',
                size: 'lg',
                resolve: {
                    data: function () {
                        return { data: assignment };
                    }
                }
            });
        }

        //Get MailMeesages
        $scope.getMailMessages = function () {
            $scope.inBoxMessages = [];
            $scope.inboxCounter = 0;
            MailService.mailResource.GetInboxMessages($scope.userInfo._id).$promise.then(function (response) {
                $scope.inBoxMessages = [];
                angular.forEach(response, function (value, key) {
                    if (!value.isDelete && value.fromUser[0] != self.user._id) {
                        if (!value.isRead) {
                            $scope.inboxCounter++;
                            $scope.inBoxMessages.push(value);
                        }
                    }
                });
                for (var j = 0; j < $scope.inBoxMessages.length; j++) {
                    $scope.inBoxMessages[j].messageUpdateT = self.updateMessageTme($scope.inBoxMessages[j]._date)
                }
            })
        }

        $scope.getMailMessages();
        $interval(function () {
            $scope.getMailMessages();
        }, 9000)

        //Get Tasks
        $scope.getTasks = function () {
            TaskAdmin.taskResource.getAssignmentsByIds($scope.userInfo.projectAassignments).$promise.then(function (response) {
                $scope.taskList = response;
                angular.forEach($scope.taskList, function (value, key) {
                    value.messageUpdateT = self.updateMessageTme(value._date)
                    if (!value.isDone) {
                        $scope.taskCounter++;
                    }
                })
            })
        }
        //Check Get Tasks
        if ($scope.userInfo.projectAassignments != null) {
            $scope.getTasks();
        };

        //Get Reminders
        $scope.getReminders = function () {
            if (AuthService.getUserInfo().reminders.length != 0) {
                ReminderService.reminderResource.GetRemindersByIds(AuthService.getUserInfo().reminders).$promise.then(function (response) {
                    $scope.reminderList = response;
                    angular.forEach($scope.reminderList, function (value, key) {
                        value.messageUpdateT = self.updateMessageTme(value._date)
                    });
                    $scope.reminderCounter = 0;
                    var endTime = new Date()
                    angular.forEach(response, function (value, key) {
                        var difference = new Date((parseInt(value.reminderTime.substr(6)))) - endTime.getTime();
                        if (difference > 0) {
                            value.remindeMe = $timeout(function () {
                                $scope.reminderCounter++;
                                alert('My  Reminder at ' + difference)
                            }, difference)
                        } else {
                            if (!value.isApproved) {
                                $scope.reminderCounter++;
                            }
                        }
                    })
                })
            }
        }
        //Check Get Reminders
        if ($scope.userInfo.reminders != null) {
            $scope.getReminders();
        };

        $scope.$on('newReminder', function () {
            $scope.getReminders();

        });


        //Time Update

        //Reminder
        $interval(function () {
            angular.forEach($scope.reminderList, function (value, key) {
                value.messageUpdateT = self.updateMessageTme(value._date)
            });
        }, 20000);

        //mail
        $interval(function () {
            angular.forEach($scope.taskList, function (value, key) {
                value.messageUpdateT = self.updateMessageTme(value._date)
            });
        }, 20000);

        //task
        $interval(function () {
            angular.forEach($scope.inBoxMessages, function (value, key) {
                value.messageUpdateT = self.updateMessageTme(value._date)
            });
        }, 20000);

        self.updateMessageTme = function (messageTime) {
            var startTime = new Date(parseInt(messageTime.substr(6)))
            var endTime = new Date()
            var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
            var resultInMinutes = Math.round(difference / 60000);
            if (resultInMinutes > 60) {
                return "more than 1h";
            } else {

                return resultInMinutes + " mins ago";
            }
        }
        $scope.hasPermission = function (role) {
            return RoleService.hasPermission(role);
        }
    }

    angular.module('eli.admin')
      .controller('NavCtrl', ['AuthService', '$scope', '$rootScope', '$timeout', 'ReminderService', '$location', 'MailService', '$interval', 'UserAdmin', 'TaskgAdmin', '$modal', 'RoleService', 'TaskAdmin', NavCtrl]);
}());
