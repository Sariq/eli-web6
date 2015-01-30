(function () {
    function MeetingListController(MeetingAdmin,$http, $stateParams, PatientAdmin) {
    var self = this;
    console.log(MeetingAdmin);
        //self.meetings = MeetingAdmin.listMeetings();
    self.meetings = '';
 
    //self.patient = PatientAdmin.patient;
    self.patient = PatientAdmin.get($stateParams.patientId);
    console.log(self.patient)
    self.op1 = false;
    self.op2 = true;
    self.op3 = false;

    self.getMeetingsByIds=function(){

        self.patient.$promise.then(function (result) {
            if (self.patient.meetings != null) {
                $http({
                    url: '/MeetingService.svc/GetMeetingsByIds',
                    method: 'POST',
                    data: self.patient.meetings
                }).then(function (response) {

                    self.meetings = response.data;


                }, function () { alert("getAssignmentsByIds edit error") });
            }

        });

    }


    if ($stateParams.patientId) {

        self.getMeetingsByIds()
       

    }



    if (self.patient != '') {

  
       
    }
     self.remove = function (idx,meeting) {
        console.log(meeting);
        console.log(meeting._id);
     

        $http({
            url: '/MeetingService.svc/deleteMeeting',
            method: 'POST',
            data:  meeting._id 
        }).then(function (response) {
           PatientAdmin.deleteMeeting(self.patient, idx);
           self.patient.$update(function (response) {
              
                self.getMeetingsByIds()

            });
          
        }, function () { alert("getAssignmentsByIds edit error") });

        //meeting.$remove({id: meeting._id}, function () {
        //  self.meetings = MeetingAdmin.query();
        //});
     };

   
  }

  angular.module('eli.admin')
    .controller('MeetingListController', ['MeetingAdmin','$http', '$stateParams', 'PatientAdmin', MeetingListController]);
}());
















