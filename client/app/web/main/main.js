
angular.module('eliApp').
  controller('MainCtrl', function ($rootScope,$scope, $document) {
     


      $scope.widgets = [
          { component: 'indexSection' },
          { component: 'weDoing' },
          { component: 'professionalInfo' },
          { component: 'helpUs' },
          { component: 'aboutUs' },
          { component: 'contactInfo' }
      ]

      $scope.dir = "about-us";

  }
)


