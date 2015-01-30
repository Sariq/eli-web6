(function () {
    angular.module('eli.common').controller('EditTaskCtrl', function ($scope, $modalInstance, $http, data, TaskgAdmin) {


        $scope.task = data;
        $scope.items = data;
        //alert($scope.task)
        //alert(angular.toJson($scope.task))
        console.log($scope.items)
        console.log('ModalInstanceCtrl');
        console.log(data);
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $http({
                url: '/AssignmentService.svc/api',
                method: 'PUT',
                data: $scope.task
            }).then(function (response) {
                alert(response._id)
                self.assignments = response.data;
                $modalInstance.close(response._id);

            }, function () { alert("getAssignmentsByIds error") });
           
        };


    });
}());