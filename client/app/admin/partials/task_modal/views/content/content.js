(function () {
    angular.module('eli.common').controller('TaskModalInstanceCtrl', function ($scope, $modalInstance,data) {



        $scope.items = data;
        
       
        console.log($scope.items)
        console.log('ModalInstanceCtrl');
        console.log(data);
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            
            $modalInstance.close($scope.items.data);
        };

        $scope.formatCell = function (cell, last) {
            if (!last) {
                return cell;
            }
        };
        $scope.getCss = function (cell, last) {
            if (!last) {
                return cell;
            }
        };

    });
}());