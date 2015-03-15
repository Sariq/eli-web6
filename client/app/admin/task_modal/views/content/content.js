(function () {
    angular.module('eli.common').controller('TaskModalItemCtrl', function ($scope, $modalInstance, data) {



        $scope.items = data;
        
        console.log('ModalInstanceCtrl');
        console.log($scope.items)
       
        console.log(data);
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            
            $modalInstance.close($scope.items.data);
        };

       

    });
}());