(function () {
  function TaskListController(TaskAdmin,$stateParams) {
    var self = this;
    console.log(TaskAdmin);
    self.tasks = TaskAdmin.query();


     self.remove = function (task) {
        console.log(task);
        console.log(task._id);
        task.$remove({_id: task._id}, function () {
          self.tasks = TaskAdmin.query();
        });
      };
  }

  angular.module('eli.admin')
    .controller('TaskListController', ['TaskAdmin','$stateParams',TaskListController]);
}());
















