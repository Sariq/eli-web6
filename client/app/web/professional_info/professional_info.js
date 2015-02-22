(function () {
    function professionalInfo() {
        return {    
            restrict: 'E',
            templateUrl: 'professional_info/professional_info.html',
            link: function (scope, element, attr) {

                                    
            }
        }
    }
    angular.module('eliApp')
        .directive('professionalInfo', [professionalInfo]);
}());