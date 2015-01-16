(function () {
    /** Task Controller
     *
     * @param $location:
     * @param TaskAdmin: Service
     * @constructor
     */
    function TaskAddController($location, $scope, TaskAdmin, $stateParams) {
        var self = this;
        self.error = '';
        self.debug = '';
        self.isNew = false;
        self.info = TaskAdmin.info;
 
        self.task = TaskAdmin.create();
   
        self.taskId = $stateParams.taskId;
        self.steps = [];

        self.addTask = function (task) {
            return TaskAdmin.addTask(task);

        }

        self.isValid = function () {
            return true;
        };

        if (self.taskId) {
            self.task = TaskAdmin.get($stateParams.taskId);
            //self.task.$promise.then(function (result) {
            //});

        } else {
            self.isNew = true;
            self.task = TaskAdmin.create();
        }

        self.save = function () {
            if (!self.isValid()) {
                return false;
            }

        };
        self.deleteConf = function (idx, task) {

            TaskAdmin.deleteConf(idx, task);
            $scope.$apply()

        };

        self.save = function () {
            if (!self.isValid()) {
                return false;
            }
            var success_url = '/tasks';
            if (self.configurationId) {
                success_url = success_url + '/' + self.task;

                console.log(success_url);
            }
            if (self.isNew) {
                self.task.$save(function (response) {
                    console.log(response);
                    if (response.status == 0) {
                        $location.path(success_url);
                    } else {
                        self.error = response.error;
                        self.debug = response.debug;
                    }
                });
            } else {
                self.task.$update(function (response) {
                    console.log(response);
                    if (response.status == 0) {
                        $location.path(success_url);
                    } else {
                        self.error = response.error;
                        self.debug = response.debug;
                    }
                });
            }
        };










    }

    angular.module('eli.admin')
        .controller('TaskAddController', ['$location', '$scope', 'TaskAdmin', '$stateParams', TaskAddController]);
}());










