
angular.module('eliApp').
  controller('MainCtrl', function ($rootScope,$scope, $document) {
      $scope.newsFeed =
[
  { title: "עיריית ניו יורק דנה עם הקהילה החרדית באיסור מציצת דם בברית מילה", content: "לשכתו של ראש העיר ניו יורק, ביל דה בלסיו, פתחה במשא ומתן עם נציגי הקהילה החרדית בנוגע לאפשרות של רגולציה מטעם הרשויות על טקסי ברית מילה, תוך שמירת חופש הדת." },
 // { title: "test2 Title", content: "Test22222 content Test contentTest contentTest contentTest contentTest contentTest content" }

]


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


