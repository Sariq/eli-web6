(function () {
    function MeetingListController($scope,MeetingAdmin, $http, $stateParams, PatientAdmin, $filter, ngTableParams) {
    var self = this;
    console.log(MeetingAdmin);
        //self.meetings = MeetingAdmin.listMeetings();
    self.meetings = '';
    self.data;
 
    //self.patient = PatientAdmin.patient;
    self.patient = PatientAdmin.get($stateParams.patientId);
    console.log(self.patient)
    self.op1 = false;
    self.op2 = true;
    self.op3 = false;
    self.patient = PatientAdmin.patient;
    self.getMeetingsByIds=function(){
        console.log(self.patient.meetings);
        self.patient.$promise.then(function (result) {
            if (self.patient.meetings != null) {
                $http({
                    url: '/MeetingService.svc/GetMeetingsByIds',
                    method: 'POST',
                    data: self.patient.meetings
                }).then(function (response) {

                    self.meetings = response.data;
                    self.data = response.data;
                    console.log(self.data)
                    self.myFun();

                }, function () { alert("getAssignmentsByIds edit error") });
            }

        });

    }



    self.myFun = function () {
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            sorting: {
                title: 'asc'     // initial sorting
            }
        }, {
            total: self.data.length, // length of self.data
            getData: function ($defer, params) {
                // use build-in angular filter
                var orderedData = params.sorting() ?
                                    $filter('orderBy')(self.data, params.orderBy()) :
                                    self.data;

                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
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
    .controller('MeetingListController', ['$scope','MeetingAdmin', '$http', '$stateParams', 'PatientAdmin', '$filter', 'ngTableParams', MeetingListController]);
}());
















