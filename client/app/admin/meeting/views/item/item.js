(function () {
    /** Meeting Controller
     *
     * @param $location:
     * @param MeetingAdmin: Service
     * @constructor
     */
    function MeetingItemController($location, $rootScope, $state, $scope, MeetingAdmin, $stateParams, TaskModalService, $modal, $http, PatientAdmin) {
        console.log("MeetingItemController")
      

        var self = this;
        self.id = '';
        self.error = '';
        self.debug = '';
        self.isNew = false;
        self.info = MeetingAdmin.info;
        self.assignments = '';
        self.meeting = MeetingAdmin.create();
        self.patient = PatientAdmin.patient;
       //self.patient = PatientAdmin.patient;
        
        //self.patient = PatientAdmin.patient;
       
        self.meetingId = $stateParams.meetingId;
        self.patientId = $stateParams.patientId;
        self.steps = [];

        self.addMeeting = function (meeting) {
            return MeetingAdmin.addMeeting(meeting);

        }

        self.isValid = function () {
            return true;
        };
       
        if (self.meetingId) {
            self.meeting = MeetingAdmin.get(self.meetingId);
            console.log(self.meeting);
            self.meeting.$promise.then(function (result) {
              
                $http({
                    url: '/AssignmentService.svc/getAssignmentsByIds',
                    method: 'POST',
                    data: result.assignments
                }).then(function (response) {
               
                    self.assignments = response.data;
                  
                  
                }, function () { alert("getAssignmentsByIds edit error") });

            });

        } else {
            self.isNew = true;
            self.meeting = MeetingAdmin.create();
        }

     
        self.deleteConf = function (idx, meeting) {

            MeetingAdmin.deleteConf(idx, meeting);
            $scope.$apply()

        };

        self.save = function () {
           
            if (self.isNew) {
                
                console.log("self.meeting");
                console.log(self.meeting);
                self.meeting.$save(function (response) {
                    console.log("response");



                    self.patient = PatientAdmin.get(PatientAdmin.patient._id);
                    self.patient.$promise.then(function (result) {
                        console.log(self.patient);
                 

                            PatientAdmin.addMeeting(self.patient, response._id);
                           
                            
                            self.patient.$update(function (response) {
                                $location.path('/meetings');
                            });
                        

                    });


                 // alert(angular.toJson(response));
                  
                
                     

                        //})
                      
                    // $location.path('patient/add/' + self.patientId +'/'+ response._id)
                
                    
                        
               
                });
            } else {
                self.meeting.$update(function (response) {
                    console.log(response);
                    //if (response.status == 0) {
                    //$location.path(success_url);
                    $location.path('/meetings');
                    //} else {
                    //    self.error = response.error;
                    //    self.debug = response.debug;
                    //}
                });
            }
        };




        self.openModal = function () {
            //MeetingAdmin.addTask(self.meeting);
           
            console.log('TaskModalService.openModal');
            var newTask = { title: '', user: '', content: '', isDone: false };
            var modalInstance = $modal.open({
                templateUrl: '../admin/partials/task_modal/views/add/add.html',
                controller: 'TaskModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    data: function () {
                        return { data: newTask };
                    }
                }
            });

            modalInstance.result.then(function (res) {
   
                MeetingAdmin.addTask(self.meeting, res);
                $http({
                    url: '/AssignmentService.svc/getAssignmentsByIds',
                    method: 'POST',
                    data: self.meeting.assignments
                }).then(function (response) {
                 
                    self.assignments = response.data;


                }, function () { alert("getAssignmentsByIds error") });

                console.log('Selected True');
            }, function (data) {
                var resp = angular.copy(data);
                console.log('Selected false');
            });
        };


        //self.bgColor = {};

        //self.init = function () {

        //}

        //self.pickColor = function () {
        //    return 'red';
        //}

        //self.newColor = function () {
        //    alert()
        //    self.bgColor['background'] = self.pickColor();

        //}


    }

    angular.module('eli.admin')
        .controller('MeetingItemController', ['$location', '$rootScope', '$state', '$scope', 'MeetingAdmin', '$stateParams', 'TaskModalService', '$modal', '$http', 'PatientAdmin', MeetingItemController]);
}());










