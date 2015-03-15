(function () {
    /** Meeting Controller
     *
     * @param $location:
     * @param MeetingAdmin: Service
     * @constructor
     */
    function MeetingAddController($location, $state, MeetingAdmin, $stateParams, $modal, PatientAdmin) {
        var self = this;
        self.isNew = false;
        self.patient = PatientAdmin.getPatient();
        self.meetingId = $stateParams.meetingId;
        self.index = $stateParams.index;

        //Checks Add or Update
        if (self.meetingId) {
            self.meeting = MeetingAdmin.getMeeting();
        } else {
            self.isNew = true;
            self.meeting = MeetingAdmin.create();
        }
        //Save or update meeting
        self.save = function () {
            if (self.isNew) {
                self.meeting.$save(function (response) {
                    PatientAdmin.addMeeting(self.patient, response._id);
                    PatientAdmin.update(self.patient).$promise.then(function () { $location.path('/patient/profile/' + self.patient._id); })
                });
            } else {
                MeetingAdmin.update(self.meeting).$promise.then(function () {
                    $location.path('/meeting/item/' + self.meeting._id + '/' + self.index);
                })
            }
        };
    }
    angular.module('eli.admin')
        .controller('MeetingAddController', ['$location','$state', 'MeetingAdmin', '$stateParams', '$modal', 'PatientAdmin', MeetingAddController]);
}());










