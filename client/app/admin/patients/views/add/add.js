(function () {
    /** Patient Controller
     *
     * @param $location:
     * @param PatientAdmin: Service
     * @constructor
     */
    function PatientAddController($location, $scope, PatientAdmin, $stateParams) {
        var self = this;
        self.error = '';
        self.debug = '';
        self.isNew = false;
        self.info = PatientAdmin.info;
 
        self.patient = PatientAdmin.create();
   
        self.patientId = $stateParams.patientId;
        self.steps = [];

        self.addTask = function (patient) {
            return PatientAdmin.addTask(patient);

        }

        self.isValid = function () {
            return true;
        };

        if (self.patientId) {
            self.patient = PatientAdmin.get($stateParams.patientId);
            //self.patient.$promise.then(function (result) {
            //});

        } else {
            self.isNew = true;
            self.patient = PatientAdmin.create();
        }

        self.save = function () {
            if (!self.isValid()) {
                return false;
            }

        };
        self.deleteConf = function (idx, patient) {

            PatientAdmin.deleteConf(idx, patient);
            $scope.$apply()

        };

        self.save = function () {
            if (!self.isValid()) {
                return false;
            }
            var success_url = '/patients';
            if (self.configurationId) {
                success_url = success_url + '/' + self.patient;

                console.log(success_url);
            }
            if (self.isNew) {
                self.patient.$save(function (response) {
                    console.log(response);
                    if (response.status == 0) {
                        $location.path(success_url);
                    } else {
                        self.error = response.error;
                        self.debug = response.debug;
                    }
                });
            } else {
                self.patient.$update(function (response) {
                    console.log(response);
                    if (response.status == 0) {
                        $location.path(success_url);
                    } else {
                        self.error = response.error;
                        self.debug = response.debug;
                    }
                });
            }
        };










    }

    angular.module('eli.admin')
        .controller('PatientAddController', ['$location', '$scope', 'PatientAdmin', '$stateParams', PatientAddController]);
}());










