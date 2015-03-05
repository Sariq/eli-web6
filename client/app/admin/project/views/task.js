(function () {
    /** Patient Controller
     *
     * @param $location:
     * @param PatientAdmin: Service
     * @constructor
     */
    function ProjectTaskController($location, $scope, PatientAdmin, $stateParams, ProjectService, $http, UserAdmin, $rootScope) {
        var self = this;
      //  $rootScope.$broadcast("taskReminder");
        $rootScope.$on('prjEdit', function () {
            alert("prjEdit")
            self.task = ProjectService.getTask();
        });
        self.task = ProjectService.getTask();
        console.log(self.task)
       
        self.reminder = { reminderTime: '', dataId: '', dataType: '',title:'' };
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
                alert("reminder need to be bigger than today date")
                self.reminder.reminderTime = self.tmpDate;
            }

        }
    
        self.reminder.dataId = self.task.id;
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

            }, function () { alert("ReminderService add error") });
            alert(self.reminder.reminderTime)
        }





        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = 'dd/MM/yyyy';



    }
    angular.module('eli.admin')
        .controller('ProjectTaskController', ['$location', '$scope', 'PatientAdmin', '$stateParams', 'ProjectService', '$http', 'UserAdmin','$rootScope', ProjectTaskController]);
}());










