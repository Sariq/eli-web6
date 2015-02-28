(function () {
    /** Patient Controller
     *
     * @param $location:
     * @param PatientAdmin: Service
     * @constructor
     */
    function ProjectTaskController($location, $scope, PatientAdmin, $stateParams, ProjectService) {
        var self = this;
       // self.patient = $stateParams.patientId;
        //self.patient = PatientAdmin.get($stateParams.patientId);
        self.patient = PatientAdmin.getPatientId();
        //self.patient.$promise.then(function (result) {
        //    console.log(self.patient);

        //});
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



    }
    angular.module('eli.admin')
        .controller('ProjectTaskController', ['$location', '$scope', 'PatientAdmin', '$stateParams','ProjectService', ProjectTaskController]);
}());










