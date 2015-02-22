(function () {
    function contactInfo() {
        return {    
            restrict: 'E',
            templateUrl: 'contact_info/contact_info.html',
            link: function (scope, element, attr) {
                $('.with-hover-text').hover(

         function (e) {

             $(this).css('overflow', 'visible');
             $(this).find('.hover-text')
                 .show()
                 .css('opacity', 0)
                 .delay(200)
                 .animate(
                     {
                         paddingTop: '25px',
                         opacity: 1
                     },
                     'fast',
                     'linear'
                 );
         },
         function (e) {
             var obj = $(this);
             $(this).find('.hover-text')
                 .animate(
                     {
                         paddingTop: '0',
                         opacity: 0
                     },
                     'fast',
                     'linear',
                     function () {
                         $(this).hide();
                         $(obj).css('overflow', 'hidden');
                     }
                 );
         }
     );
                                    
            }
        }
    }
    angular.module('eliApp')
        .directive('contactInfo', [contactInfo]);
}());