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
 
  
   
        self.patientId = $stateParams.patientId;
        self.meetingId = $stateParams.meetingId;
        alert($stateParams.patientId)
        self.steps = [];

       

        self.isValid = function () {
            return true;
        };

        if (self.patientId) {

            self.patient = PatientAdmin.get($stateParams.patientId);
            self.patient.$promise.then(function (result) {
                console.log(self.patient);
                if (typeof (self.meetingId) != 'undefined') {

                    PatientAdmin.addMeeting(self.patient, self.meetingId);
                    self.patient.$save(function (response) {

                    });
                }

            });

        } else {
            self.isNew = true;
            self.patient = PatientAdmin.create();
        }

      
       

        self.save = function () {
           
            var success_url = '/patients';
            if (self.configurationId) {
                success_url = success_url + '/' + self.patient;

            }
            if (self.isNew) {

                console.log(self.patient);
                self.patient.$save(function (response) {
                    console.log(response);
                   
                        $location.path(success_url);
                   
                        
                   
                });
            } else {
                self.patient.$update(function (response) {
                    console.log(response);
                   
                        $location.path(success_url);
                 
                });
            }
        };










    }

    angular.module('eli.admin')
        .controller('PatientAddController', ['$location', '$scope', 'PatientAdmin', '$stateParams', PatientAddController]);
}());










