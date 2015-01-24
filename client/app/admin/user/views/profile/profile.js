(function () {
    /** Patient Controller
     *
     * @param $location:
     * @param PatientAdmin: Service
     * @constructor
     */
    function PatientProfileController($location, $scope, PatientAdmin, $stateParams) {
        var self = this;
        self.patient = $stateParams.patientId;
        self.patient = PatientAdmin.get($stateParams.patientId);
        self.patient.$promise.then(function (result) {
            console.log(self.patient);

        });
        if (self.patientId) {
            self.patient = PatientAdmin.get(self.patientId);

        }
    }
    angular.module('eli.admin')
        .controller('PatientProfileController', ['$location', '$scope', 'PatientAdmin', '$stateParams', PatientProfileController]);
}());










