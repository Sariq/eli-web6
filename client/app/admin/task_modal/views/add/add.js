(function () {
    angular.module('eli.common').controller('TaskModalInstanceCtrl', function ($scope, $modalInstance, TaskgAdmin) {

        $scope.task = TaskgAdmin.create();
        //add the task to assiement DB and return the id of the object
        $scope.ok = function () {
            $scope.task.$save(function (response) {
                $modalInstance.close(response._id);
            });
        };
    });
}());