(function () {
    function indexSection() {
        return {    
            restrict: 'E',
            templateUrl: 'index_section/index_section.html',
            link: function (scope, element, attr) {

                                    
            }
        }
    }
    angular.module('eliApp')
        .directive('indexSection', [indexSection]);
}());



    
