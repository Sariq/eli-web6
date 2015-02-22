(function () {
    function helpUs() {
        return {    
            restrict: 'E',
            templateUrl: 'help_us/help_us.html',
            link: function (scope, element, attr) {

                                    
            }
        }
    }
    angular.module('eliApp')
        .directive('helpUs', [helpUs]);
}());