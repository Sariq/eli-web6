(function () {

    function ScrollService($resource, $state) {
        var self = this;
        //self.nav = [{ "data-slide": "3", id: "A4", href: "#slide-3", title: "איך תוכלו לעזור לנו", icon: "icon icon-briefcase" },
        //        { "data-slide": "1", id: "A4", href: "#slide-1", title: "מה אנחנו עושים", icon: "icon icon-heart" },
        //        { "data-slide": "0", id: "A6", href: "#main", title: "בית", icon: "icon icon-home" }];


        self.nav = {
            'forParents': [
                             { "data-slide": "3", class: "col-12 col-sm-4", id: "A4", href: "#slide-3", title: "איך תוכלו לעזור לנו", icon: "icon icon-briefcase" },
                             { "data-slide": "1", class: "col-12 col-sm-4", id: "A4", href: "#slide-1", title: "מה אנחנו עושים", icon: "icon icon-heart" },
                             { "data-slide": "0", class: "col-12 col-sm-4", id: "A6", href: "#main", title: "בית", icon: "icon icon-home" }],

           'index': [
                             { "data-slide": "6", class: "col-12 col-sm-2", id: "menu-link-1", href: "#slide-1", title: "צור קשר", icon: "icon icon-envelope" },
                             { "data-slide": "5", class: "col-12 col-sm-2", id: "menu-link-5", href: "#slide-5", title: "אודותינו", icon: "icon icon-heart" },
                             { "data-slide": "4", class: "col-12 col-sm-2", id: "menu-link-4", href: "#slide-4", title: "מידע", icon: "icon icon-home" },
                             { "data-slide": "3", class: "col-12 col-sm-2", id: "menu-link-3", href: "#slide-3", title: "איך תוכלו לעזור לנו", icon: "icon icon-heart" },
                             { "data-slide": "2", class: "col-12 col-sm-2", id: "menu-link-2", href: "#slide-2", title: "מה אנחנו עושים", icon: "icon icon-heart" },
                             { "data-slide": "1", class: "col-12 col-sm-2", id: "menu-link-6", href: "#slide-6", title: "HOME", icon: "icon icon-heart" }]
        };

        //alert(angular.toJson(self.nav['forParents']))
        self.setNav = function () {


        }

        self.getNav = function (pageName) {
            return self.nav[pageName];

        }


        self.scroll = function () {


            // 1
            $('.with-hover-text, .regular-link').click(function (e) {
                e.stopPropagation();
            });

            $(function () {
                var pause = 10;
                $(document).scroll(function (e) {

                    delay(function () {

                        var tops = [];

                        $('.story').each(function (index, element) {
                            $(element).css("height", (100) + "vh");
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