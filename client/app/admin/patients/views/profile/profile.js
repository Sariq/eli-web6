(function () {
    /** Patient Controller
     *
     * @param $location:
     * @param PatientAdmin: Service
     * @constructor
     */
    function PatientProfileController($location, $scope, PatientAdmin, $stateParams) {
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


        self.tabs = [
  { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
  { title: 'Dynamic Title 2', content: 'Dynamic content 2' }
        ];




        self.remove = function (patient) {
            console.log(patient);
   
            PatientAdmin.remove();
            $location.path('/patients');
   
        };



    }
    angular.module('eli.admin')
        .controller('PatientProfileController', ['$location', '$scope', 'PatientAdmin', '$stateParams', PatientProfileController]);
}());










