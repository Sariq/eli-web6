//(function () {
//  function TaskListController(TaskAdmin,$stateParams) {
   
//      self.openModal = function () {
//          //MeetingAdmin.addTask(self.meeting);

//          console.log('TaskModalService.openModal');
//          var newTask = { title: '', user: '', content: '', isDone: false };
//          var modalInstance = $modal.open({
//              templateUrl: '../admin/partials/task_modal/views/add/add.html',
//              controller: 'TaskModalInstanceCtrl',
//              size: 'lg',
//              resolve: {
//                  data: function () {
//                      return { data: newTask };
//                  }
//              }
//          });

//          modalInstance.result.then(function (res) {

//              MeetingAdmin.addTask(self.meeting, res);
//              $http({
//                  url: '/AssignmentService.svc/getAssignmentsByIds',
//                  method: 'POST',
//                  data: self.meeting.assignments
//              }).then(function (response) {

//                  self.assignments = response.data;


//              }, function () { alert("getAssignmentsByIds error") });

//              console.log('Selected True');
//          }, function (data) {
//              var resp = angular.copy(data);
//              console.log('Selected false');
//          });
//      };
//  }

//  angular.module('eli.admin')
//    .controller('TaskListController', ['TaskAdmin','$stateParams',TaskListController]);
//}());
















