(function () {
    function PatientProfileController($location, $scope, PatientAdmin, $stateParams) {
        var self = this;
        self.patientId = $stateParams.patientId;

        //Get Patient and set in service
        if (self.patientId) {
            self.patient = PatientAdmin.get(self.patientId);
            self.patient.$promise.then(function (response) {
                PatientAdmin.setPatient(response);
                $location.path('/patient/profile/' + self.patient._id + '/meetings');
            })
        }
        //Remove Patient
        self.remove = function (patient) {
            PatientAdmin.remove(patient);
            $location.path('/patients');
        };
    }
    angular.module('eli.admin')
        .controller('PatientProfileController', ['$location', '$scope', 'PatientAdmin', '$stateParams', PatientProfileController]);
}());










