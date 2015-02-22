(function () {
    function weDoing() {
        return {    
            restrict: 'E',
            templateUrl: 'we_doing/we_doing.html',
            link: function (scope, element, attr) {

                                    
            }
        }
    }
    angular.module('eliApp')
        .directive('weDoing', [weDoing]);
}());