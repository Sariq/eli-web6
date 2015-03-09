(function () {
    angular.module('eli.common').controller('TaskModalInstanceCtrl', function ($scope, $modalInstance, data, TaskgAdmin) {


        $scope.task = TaskgAdmin.create();
        $scope.items = data;
        
       
        console.log($scope.items)
        console.log('ModalInstanceCtrl');
        console.log(data);
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            //add the task to assiement DB and return the id of the object
            $scope.task.$save(function (response) {
                //alert(response._id)
                $modalInstance.close(response._id);
            });
           
        };

    

    });
}());