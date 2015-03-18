//uiGmapGoogleMapApi
angular.module('eliApp').
  controller('MainCtrl', function ($rootScope, $scope, $document) {
      $scope.currSection = '';
      $scope.setSection = function (currSection) {
          $scope.currSection = currSection;
      }
      $scope.back = function () {
          window.history.back();
      };
      $scope.options = { language: 'ar' };
      $scope.map = { center: { latitude: 32.072776, longitude: 34.781906 }, zoom: 8 };
      $scope.marker = { latitude: 32.072776, longitude: 34.781906 };

  
      //uiGmapGoogleMapApi.then(function (maps) {
      //    console.log(maps);
      //})

      $scope.$on('sectionChanged', function (event, currSection) {
          console.log("herrree");

          $scope.currSection = currSection;
          switch(currSection) {
              case 1:
                  $scope.currSection1=true;
                  break;
              case 2:
                  $scope.currSection2 = true;
                  break;
              case 3:
                  $scope.currSection3 = true;
                  break;
              case 4:
                  $scope.currSection4 = true;
                  break;
              case 5:
                  $scope.currSection5 = true;
                  break;
              case 6:
                  $scope.currSection6 = true;
                  break;
              default:
               return;
          }
          $scope.$apply();
      });
      

  }
)


