(function () {

    function ScrollService($resource, $state) {
        var self = this;

        self.scroll = function () {


            // 1
            $('.with-hover-text, .regular-link').click(function (e) {
                e.stopPropagation();
            });
            $('.story').each(function (index, element) {
                $(element).css("height", (100) + "vh");

            })


            $(function () {
                var pause = 10;
                $(document).scroll(function (e) {

                    delay(function () {

                        var tops = [];

                        $('.story').each(function (index, element) {

                            tops.push($(element).offset().top - 200);
                        })
                        //console.log(tops)//tops=slides locations
                        var scroll_top = $(this).scrollTop();


                        console.log(scroll_top)//location while scrollin
                        var lis = $('.nav > li');
                        //console.log(lis)//which tab is active
                        for (var i = tops.length - 1; i >= 0; i--) {
                            // alert(scroll_top +'-'+tops[i])
                            if (scroll_top >= tops[i]) {

                                //   console.log(lis[tops.length - 1 - i])
                                menu_focus(lis[tops.length - 1 - i], i + 1);
                                break;
                            }
                        }
                    },
                    10);
                });


                $(document).scroll();
            });

          
           //1


           



        }



    }

    angular.module('eliApp')
    .service('ScrollService', ['$resource', '$state', ScrollService])
}());