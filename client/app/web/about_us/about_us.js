(function () {
    function aboutUs() {
        return {    
            restrict: 'EA',
            templateUrl: 'about_us/about_us.html',
            link: function (scope, element, attr) {

                                    
            }
        }
    }
    angular.module('eliApp')
        .directive('aboutUs', [aboutUs]);
}());



    
