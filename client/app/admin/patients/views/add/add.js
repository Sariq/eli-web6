(function () {
    function PatientAddController($location, $scope, PatientAdmin, $stateParams, UserAdmin, AuthService, $filter) {
        var self = this;
        self.isNew = false;
        self.userInfo = AuthService.getUserInfo();
        self.patientId = $stateParams.patientId;

        //Checks Add or Update
        if (self.patientId) {
            self.patient = PatientAdmin.getPatient();
            self.patient.birthDate = $filter('jsDate')(self.patient.birthDate);
            $scope.temp_birthDate = $filter('date')(new Date(self.patient.birthDate.getTime()), 'dd/MM/yyyy');
        } else {
            self.isNew = true;
            self.patient = PatientAdmin.create();
        }

        self.addContact = function () {
            return PatientAdmin.addContact(self.patient);
        }

        // Save/Update Patient
        self.save = function () {
            if (self.isNew) {
                self.patient.birthDate = $scope.temp_birthDate;
                self.patient.birthDate = '/Date(' + self.patient.birthDate.getTime() + ')/'
                self.patient.$save(function (response) {
                    UserAdmin.addPatient(self.userInfo, response._id)
                    UserAdmin.updateUser(self.userInfo);
                    $location.path('/patient/profile/' + response._id);
                });
            } else {
                self.patient.birthDate = $scope.temp_birthDate;
                self.patient.birthDate = '/Date(' + self.patient.birthDate.getTime() + ')/'
                PatientAdmin.update(self.patient);
                $location.path('/patient/profile/' + self.patient._id);
            }
        };




        //Date Picker
        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };
        $scope.format = 'dd/MM/yyyy';



    }

    angular.module('eli.admin')
        .controller('PatientAddController', ['$location', '$scope', 'PatientAdmin', '$stateParams', 'UserAdmin', 'AuthService', '$filter', PatientAddController]);
}());










