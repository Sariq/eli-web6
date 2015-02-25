
angular.module('eliApp').
  controller('MyCtrl', function ($rootScope, $scope, $document) {



        
      /***************
      * = scrollTop *
      ***************/
      htmlbody = $('html,body');
      $rootScope.$on('$stateChangeSuccess', function () {
          htmlbody = $('html,body');
          htmlbody.stop(false, false).animate({
              scrollTop: 0
          }, 0, 'easeInOutQuart');
      });
      /***************
      * = scrollTop *
      ***************/


      /***************
      * = Menu hover *
      ***************/
      var menu_item = $('.nav').find('li');

      menu_item.hover(
          function (e) {
              var icon = $(this).find('.icon');
              var tx = $(this).find('.text');
              var tx_pos = tx.offset().left - $('.nav').offset().left;
              var left_pos = icon.offset().left - $('.nav').offset().left;
              var el_width = icon.width() + $(this).find('.text').width() - 10;

              var hover_bar = $('<div class="active-menu special-active-menu"></div>')
                  .css('left', tx_pos)
                  .css('width', el_width)
                  .attr('id', 'special-active-menu-' + $(this).data('slide'));

              $('.active-menu').after(hover_bar);
          },
          function (e) {
              $('.special-active-menu').remove();
          }
      );
      /***************
      * = Menu hover *
      ***************/



      /***************
      * =angular-scroll *
      ***************/
      $scope.toTheTop = function () {
          $document.scrollTopAnimated(0, 5000).then(function () {

              console && console.log('You just scrolled to the top!');
          });
      }
      var section2 = angular.element(document.getElementById('section-2'));
      $scope.toSection2 = function () {
          $document.scrollToElementAnimated(section2);
      }
      /***************
      * =angular-scroll *
      ***************/


      /***************
      * = Arrow Click *
      ***************/
      $scope.arrowClick = function (e) {
          e.preventDefault();

          if ($(this).hasClass('disabled')) {

              return;
          }

          var slide = null;
          console.log($('.nav > li >a.active'))
          var datasheet = $('.nav > li> a.active').data('slide');

          var offset_top = false;
          var offset_left = false;


          switch (e.originalEvent.srcElement.id) {
              case 'arrow-up':
                  offset_top = (datasheet - 1 == 1) ? '0px' : $('.slide[data-slide="' + (datasheet - 1) + '"]').offset().top;
                  break;
              case 'arrow-down':
                  console.log(datasheet)
                  offset_top = $('.slide[data-slide="' + (datasheet + 1) + '"]').offset().top;
                  break;
              case 'arrow-left':
                  offset_left = $('#section-3 .row').offset().left + 452;
                  if (offset_left > 0) {
                      offset_left = '0px';
                  }
                  break;
              case 'arrow-right':
                  offset_left = $('#section-3 .row').offset().left - 452;
                  if (offset_left < $('body').width() - $('#slide-3 .row').width()) {
                      offset_left = $('body').width() - $('#slide-3 .row').width();
                  }
                  break;
          }

          if (offset_top != false) {
              htmlbody.stop(false, false).animate({
                  scrollTop: offset_top
              }, 1500, 'easeInOutQuart');
          }

          if (offset_left != false) {
              if ($('#slide-3 .row').width() != $('body').width()) {
                  $('#slide-3 .row').stop(false, false).animate({
                      left: offset_left
                  }, 1500, 'easeInOutQuart');
              }
          }
      }
      /***************
      * = Arrow Click *
      ***************/


      /***************
   * = Hover text *
   * Hover text for the last slide
   ***************/
   
      /***************
* = Hover text *
* Hover text for the last slide
***************/







  }
).value('duScrollOffset', 30);



//angular.module('eliApp').directive('proxy', ['$parse', '$injector', '$compile', '$http', function ($parse, $injector, $compile, $http) {
//    return {
//        replace: true,
//        link: function (scope, element, attrs) {
//            var nameGetter = $parse(attrs.proxy);
//            var name = nameGetter(scope);
//            var value = undefined;
            
//            if (attrs.proxyValue) {
//                var valueGetter = $parse(attrs.proxyValue);
//                value = valueGetter(scope);
               
//            }
//           // alert(angular.toJson(name.component))
//            var directive = $injector.get(name.component + 'Directive')[0];
           
//            if (value !== undefined) {
//                attrs[name.component] = value;
                
//            }
//            //alert()
          
//            $http.get(directive.templateUrl)
//        .then(function (response) {
//            var a = element.html($compile(response.data)(scope));
//        });
//            element.replaceWith(a);
//        }
//    }
//}])
//    .directive('wg-title', function () {
//    return {
//        restrict: 'A',
      
//       // template: '<h1 style="color:{{widget.color}}; font-size:{{widget.fontSize}}; background:{{widget.backgroundColor}}" >{{widget.title}}</h1>',
//        templateUrl: 'about_us/about_us.html',
//        link: function (scope, element, attrs) {

//        }
//    }
//})
//angular.module('eliApp').directive('wg-title', function () {
//    return {
//        restrict: 'EA',
//        scope: true,
//        replace: true,
//        templateUrl: 'about_us/about_us.html',
//        link: function (scope, element, attrs) {
//            alert()
//        }
//    }
//})
