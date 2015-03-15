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
            console.log($scope.task.data)
            $http({
                url: '/AssignmentService.svc/api',
                method: 'PUT',
                data: $scope.task.data
            }).then(function (response) {
                
                self.assignment = $scope.task.data;
                $modalInstance.close(response);

            }, function () { alert("getAssignmentsByIds error") });
           
        };


    });
}());