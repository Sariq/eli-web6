(function () {
    function indexSection() {
        return {    
            restrict: 'E',
            templateUrl: 'index_section/index_section.html',
            link: function (scope, element, attr) {
                scope.myInterval = 5000;
                var slides = scope.slides = [];
                scope.addSlide = function () {
                    var newWidth = 600 + slides.length + 1;
                    slides.push({
                        image: 'http://placekitten.com/' + newWidth + '/300',
                        text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' +
                          ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
                    });
                };
                for (var i = 0; i < 4; i++) {
                    scope.addSlide();
                }
                                    
            }
        }
    }
    angular.module('eliApp')
        .directive('indexSection', [indexSection]);
}());



    
