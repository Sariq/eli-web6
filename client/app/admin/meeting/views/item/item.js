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

        self.getAssignmentsByIds = function () {
            $http({
                url: '/AssignmentService.svc/getAssignmentsByIds',
                method: 'POST',
                data: self.meeting.assignments
            }).then(function (response) {

                self.assignments = response.data;


            }, function () { alert("getAssignmentsByIds error") });

        }


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
                self.getAssignmentsByIds();

                console.log('Selected True');
            }, function (data) {
                var resp = angular.copy(data);
                console.log('Selected false');
            });
        };

        self.removeAssignment=function(assignment,idx)
        {
            $http({
                url: '/AssignmentService.svc/deleteAssignment',
                method: 'POST',
                data: assignment._id
            }).then(function (response) {
               

                MeetingAdmin.deleteAssignment(self.meeting, idx);
                self.meeting.$update(function (response) {
              
                    self.getAssignmentsByIds()
                })


            }, function () { alert("deleteAssignment error") });
           

        }
        self.editAssignment = function (assignment) {
            var modalInstance = $modal.open({
                templateUrl: '../admin/partials/task_modal/views/edit/edit.html',
                controller: 'EditTaskCtrl',
                size: 'lg',
                resolve: {
                    data: function () {
                        return { data: assignment };
                    }
                }
            });


            modalInstance.result.then(function (response) {
                console.log(response)
                assignment = response;
            }, function (data) {
                var resp = angular.copy(data);
                console.log('Selected false');
            });
        }

        self.isDoneAssignmentToggle = function (assignment) {

            assignment.isDone = !assignment.isDone
            $http({
                url: '/AssignmentService.svc/api',
                method: 'PUT',
                data: assignment
            }).then(function (response) {

                
               

            }, function () { alert("AssignmentIsDone error") });
        }
        


        self.showTask = function (assignment) {
            //MeetingAdmin.addTask(self.meeting);

            console.log('TaskModalService.openModal');
            var modalInstance = $modal.open({
                templateUrl: '../admin/partials/task_modal/views/content/content.html',
                controller: 'TaskModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    data: function () {
                        return { data: assignment};
                    }
                }
            });
        }


    }

    angular.module('eli.admin')
        .controller('MeetingItemController', ['$location', '$rootScope', '$state', '$scope', 'MeetingAdmin', '$stateParams', 'TaskModalService', '$modal', '$http', 'PatientAdmin', MeetingItemController]);
}());










