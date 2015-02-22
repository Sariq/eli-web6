(function () {
    function weDoing() {
        return {    
            restrict: 'E',

            templateUrl: 'we_doing/we_doing.html',
            link: function (scope, element, attr) {
                scope.myFun = function () { alert() }
                                    
            }
        }
    }
    angular.module('eliApp')
        .directive('weDoing', [weDoing]);
}());