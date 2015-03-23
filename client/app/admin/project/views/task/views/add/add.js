(function () {
    /** Patient Controller
     *
     * @param $location:
     * @param PatientAdmin: Service
     * @constructor
     */
    function ProjectTaskController($location, $scope, PatientAdmin, $stateParams, ProjectService, $http, UserAdmin, $rootScope, $q, AuthService, TaskgAdmin) {
        var self = this;
        self.tagArr = [];
        self.sendToUser = [];
        self.userInfo = AuthService.getUserInfo();
        self.taskId = $stateParams.taskId;
        if (self.taskId) {
           self.task = TaskgAdmin.get(self.taskId);
        } else { self.task = TaskgAdmin.create() }
     
        
        //  $rootScope.$broadcast("taskReminder");
        //$rootScope.$on('prjEdit', function () {
        //    alert("prjEdit")
        //    self.temp_task = ProjectService.getTask();
        //    self.task.title = self.temp_task.text;
        //    //self.task.parentId = self.temp_task.id;

        //});
        //self.temp_task = ProjectService.getTask();
        //console.log(self.temp_task)
        //self.task.title = self.temp_task.text;
        //self.task.parentId = self.temp_task.id;

        self.reminder = { reminderTime: '', dataId: '', dataType: '', title: '' };
        self.tmpDate = new Date();

        //self.reminder.reminderTime = self.tmpDate;
        self.hourStep = 1;
        self.minuteStep = 1;
        self.timeOptions = {
            hourStep: [1, 2, 3],
            minuteStep: [1, 5, 10, 15, 25, 30]
        };

        self.toggleMinDate = function () {
            self.minDate = self.minDate ? null : new Date();
        };
        self.showMeridian = true;

        self.disabled = function (calendarDate, mode) {
            return mode === 'day' && (calendarDate.getDay() === 7 || calendarDate.getDay() === 7);
        };

        self.validateDate = function () {

            if (Date.parse(self.reminder.reminderTime) < Date.parse(self.tmpDate)) {
               console.log("reminder need to be bigger than today date")
                self.reminder.reminderTime = self.tmpDate;
            }

        }

       // self.reminder.dataId = self.temp_task.id;
        self.saveReminder = function () {

            self.reminder.reminderTime = '/Date(' + self.reminder.reminderTime.getTime() + ')/';
            self.reminder.title = self.task.title;
            self.reminder.dataType = "projectReminder";
            $http({
                url: '/ReminderService.svc/api',
                method: 'POST',
                data: self.reminder
            }).then(function (response) {

                console.log(response)

                UserAdmin.addReminder(response.data._id);
                $rootScope.$broadcast("newReminder");

            }, function () { console.log("ReminderService add error") });
           // alert(self.reminder.reminderTime)
        }

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = 'dd/MM/yyyy';





        //Tags

        self.tagArrs = UserAdmin.getUserList();
        console.log(self.tagArrs)
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
            self.sendToUser.push(tag.userId);

        };

        $scope.tagRemoved = function (tag) {
            var x = $scope.log.indexOf(tag.tagId);
            self.sendToUser.splice(x, tag.tagId);
        };

        //Tags
        //Add task





        //self.task.$save(function (response) {
        //    console.log(response);
        //    if (response.status == 0) {
        //        $location.path(success_url);
        //    } else {
        //        self.error = response.error;
        //        self.debug = response.debug;
        //    }
        //});




    }
    angular.module('eli.admin')
        .controller('ProjectTaskController', ['$location', '$scope', 'PatientAdmin', '$stateParams', 'ProjectService', '$http', 'UserAdmin', '$rootScope', '$q','AuthService','TaskgAdmin', ProjectTaskController]);
}());










