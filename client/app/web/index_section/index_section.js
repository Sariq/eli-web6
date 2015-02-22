(function () {
    function indexSection() {
        return {    
            restrict: 'EA',
            templateUrl: 'index_section/index_section.html',
            link: function (scope, element, attr) {

                                    
            }
        }
    }
    angular.module('eliApp')
        .directive('indexSection', [indexSection]);
}());



    
