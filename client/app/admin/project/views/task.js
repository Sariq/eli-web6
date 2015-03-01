(function () {
    /** Patient Controller
     *
     * @param $location:
     * @param PatientAdmin: Service
     * @constructor
     */
    function ProjectTaskController($location, $scope, PatientAdmin, $stateParams, ProjectService) {
        var self = this;
        console.log("task prj")
       // self.patient = $stateParams.patientId;
        //self.patient = PatientAdmin.get($stateParams.patientId);
        self.patient = PatientAdmin.getPatientId();
        //self.patient.$promise.then(function (result) {
        //    console.log(self.patient);
        self.tmpeventDuedate = new Date();
        self.hourStep = 1;
        self.minuteStep = 1;
        self.timeOptions = {
            hourStep: [1, 2, 3],
            minuteStep: [1, 5, 10, 15, 25, 30]
        };
        self.toggleMinDate = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        self.showMeridian = true;
        //});
        // Disable weekend selection
        self.disabled = function (calendarDate, mode) {
            return mode === 'day' && (calendarDate.getDay() === 0 || calendarDate.getDay() === 7);
        };

        if (self.patientId) {
            self.patient = PatientAdmin.get(self.patientId);

        }

        self.task=ProjectService.getTask();
        console.log(self.task)
        self.remove = function (patient) {
            console.log(patient);
   
            PatientAdmin.remove();
            $location.path('/patients');
   
        };
        $scope.today = function () {
            self.patient.birthDate = '';
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };



        $scope.toggleMin = function () {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };



        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = 'dd/MM/yyyy';



    }
    angular.module('eli.admin')
        .controller('ProjectTaskController', ['$location', '$scope', 'PatientAdmin', '$stateParams','ProjectService', ProjectTaskController]);
}());










