(function () {
    function professionalInfo() {
        return {    
            restrict: 'E',
            templateUrl: 'professional_info/professional_info.html',
            link: function (scope, element, attr) {
                scope.openModal = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'templates/modal.html',
                        controller: '',
                        size: 'lg'
                    })
                
                }
                                    
            }
        }
    }
    angular.module('eliApp')
        .directive('professionalInfo', [professionalInfo]);
}());