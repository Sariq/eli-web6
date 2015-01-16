angular.module('angularTranslateApp', ['pascalprecht.translate'])
  .config(function ($translateProvider, $translatePartialLoaderProvider) {
      //$translateProvider.useLoader('$translatePartialLoader', {
      //    urlTemplate: '../common/translation/{lang}/{part}.json'
      //});

      $translateProvider.translations('he', {
          'HOME': 'ראשי',
          'Assignment': 'משימה',
          'Assignments': 'משימות',
          'Patient': 'מטופל',
          'Patients': 'מטופלים',
          'Meeting': 'טיפול',
          'Meetings': 'טיפולים',
          'Show Details' : 'הצג פרטים'

      })
.translations('ar', {
    HOME: 'الرئيسية',


});
      $translateProvider.preferredLanguage('he');
                

  });