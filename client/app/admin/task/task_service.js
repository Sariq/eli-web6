(function () {

    function TaskAdmin($resource) {
        var self = this;
        self.taskResource = $resource('/AssignmentService.svc/api/:action:id', { id: "@id", action: "@action" },
                   {
                       update: { method: 'PUT' },
                       getAssignmentsByIds: {
                           method: 'POST', params: { action: 'getAssignmentsByIds' }, isArray: true
                       }
                   }
        );

        self.get = function (task_id) {
            return self.taskResource.get({ _id: task_id });
        };

        self.save = function (task) {
            return self.taskResource.save();
        };

        self.create = function () {
            var task = {
                title: '',
                content: ''

            };
            return new self.taskResource(task);
        };

        self.deleteTask = function (idx, task) {

            task.configurations.splice(idx, 1);
            console.log(task)

        };

        self.addTask = function (task) {
            task.tasks.push({
                title: '',
                content: '',
                done: false
            });
        }

        self.query = function () {
            return self.taskResource.query();
        };

        self.listTasks = function () {
            return self.taskResource.query()
        };


        return self;



    }

    angular.module('eli.admin')
    .service('TaskAdmin', ['$resource', TaskAdmin])
}());