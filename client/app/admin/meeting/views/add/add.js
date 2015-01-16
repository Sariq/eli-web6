(function () {
    /** Meeting Controller
     *
     * @param $location:
     * @param MeetingAdmin: Service
     * @constructor
     */
    function MeetingAddController($location, $scope, MeetingAdmin, $stateParams, TaskModalService, $modal, $http) {
        var self = this;
        self.error = '';
        self.debug = '';
        self.isNew = false;
        self.info = MeetingAdmin.info;
        self.assignments = '';
        self.meeting = MeetingAdmin.create();
   
        self.meetingId = $stateParams.meetingId;
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
            if (!self.isValid()) {
                return false;
            }
            var success_url = '/meetings';
            if (self.configurationId) {
                success_url = success_url + '/' + self.meeting;

                console.log(success_url);
            }
            if (self.isNew) {
                self.meeting.$save(function (response) {
                    console.log(response);
                    
                        $location.path(success_url);
                    
               
                });
            } else {
                self.meeting.$update(function (response) {
                    console.log(response);
                    //if (response.status == 0) {
                        $location.path(success_url);
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
        .controller('MeetingAddController', ['$location', '$scope', 'MeetingAdmin', '$stateParams', 'TaskModalService', '$modal', '$http', MeetingAddController]);
}());










