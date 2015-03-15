(function () {
    function AssignmentListCtrl($scope, AssignmentAdmin, PatientAdmin, $filter, ngTableParams) {
        var self = this;
       
        self.patient = PatientAdmin.getPatient();
        self.meeting = MeetingAdmin.getMeeting();
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
            console.log('TaskModalService.openModal');
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
      .controller('AssignmentListCtrl', ['$scope', 'AssignmentAdmin', 'PatientAdmin', '$filter', 'ngTableParams', AssignmentListCtrl]);
}());
















