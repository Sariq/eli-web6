
(function () {
    /**
     * Creates a modal window with the task
     * @param $modal
     * @param TaskModalController
     * @constructor
     */
    function TaskModalService($modal) {

        var self = this;

        self.openModal = function (data) {
            console.log('TaskModalService.openModal');
            console.log(data);
            var modalInstance = $modal.open({
                templateUrl: '../admin/partials/task_modal/views/add/add.html',
                controller: 'TaskModalInstanceCtrl',
                    size: 'lg',
                resolve: {
                    data: function () {
                        return { data: angular.copy(data) };
                    }
                }
            });

            modalInstance.result.then(function (data) {
                console.log('Selected True');
            }, function (data) {
                var resp = angular.copy(data);
                console.log('Selected false');
            });
        };

    }

    angular.module('eli.common')
      .service('TaskModalService', ['$modal', TaskModalService]);
}());
