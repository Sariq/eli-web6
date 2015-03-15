(function () {
    function MeetingItemController($location, $state, MeetingAdmin, $stateParams, $modal, PatientAdmin, TaskAdmin) {

        var self = this;
        self.isNew = false;
        self.meetingId = $stateParams.meetingId;
        self.index = $stateParams.index;
        self.patient = PatientAdmin.getPatient();


        //Get Meeting and assignments
        if (self.meetingId) {
            self.meeting = MeetingAdmin.get(self.meetingId);
            self.meeting.$promise.then(function (reponse) {
                MeetingAdmin.setMeeting(reponse);
                
                $location.path('/meeting/item/' + self.meetingId+'/'+self.index + '/assignments');
                TaskAdmin.taskResource.getAssignmentsByIds(reponse.assignments).$promise.then(function (response) {
                    self.assignments = response;
                })
            });
        }
        self.remove = function (idx, meeting) {
            MeetingAdmin.remove(meeting).$promise.then(function () {
                PatientAdmin.deleteMeeting(self.patient, idx);
                PatientAdmin.update(self.patient).$promise.then(function () {
                    $location.path('/patient/profile/' + self.patient._id);
                })
            })
        };


        /////////////////////////////////////



        //Assignmetns

        self.getAssignmentsByIds = function () {
            TaskAdmin.taskResource.getAssignmentsByIds(self.meeting.assignments).$promise.then(function (response) {
                self.assignments = response;
            })
        }

        self.openTaskModal = function () {
            //Open task add modal
            var modalInstance = $modal.open({
                templateUrl: '../admin/task_modal/views/add/add.html',
                controller: 'TaskModalInstanceCtrl',
                size: 'lg'
            });
            //modal response task Id
            modalInstance.result.then(function (res) {
                MeetingAdmin.addTask(self.meeting, res);
                self.meeting.$update(function (response) { self.getAssignmentsByIds(); });
            });
        };

        //Remove Assignment
        self.removeAssignment = function (assignment, idx) {
            TaskAdmin.taskResource.remove({ id: assignment._id }).$promise.then(function (response) {
                MeetingAdmin.deleteAssignment(self.meeting, idx);
                self.meeting.$update(function (response) {
                    self.getAssignmentsByIds()
                })
            })
        }

        //Edit Assignment
        self.editAssignment = function (assignment) {
            var modalInstance = $modal.open({
                templateUrl: '../admin/task_modal/views/edit/edit.html',
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

        //isDon Assignment
        self.isDoneAssignmentToggle = function (assignment) {
            assignment.isDone = !assignment.isDone
            TaskAdmin.taskResource.update(assignment).$promise.then(function (response) { })
        }

        //Show Assignment
        self.showTask = function (assignment) {
            console.log(assignment)
            var modalInstance = $modal.open({
                templateUrl: '../admin/task_modal/views/content/content.html',
                controller: 'TaskModalItemCtrl',
                size: 'lg',
                resolve: {
                    data: function () {
                        return { data: assignment };
                    }
                }
            });
        }


    }

    angular.module('eli.admin')
        .controller('MeetingItemController', ['$location', '$state', 'MeetingAdmin', '$stateParams', '$modal', 'PatientAdmin', 'TaskAdmin', MeetingItemController]);
}());










