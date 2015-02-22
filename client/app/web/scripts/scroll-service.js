(function () {

    function ScrollService($resource, $state) {
        var self = this;

        self.widgets = [
       { component: 'indexSection' },
       { component: 'weDoing' },
       { component: 'professionalInfo' },
       { component: 'helpUs' },
       { component: 'aboutUs' },
       { component: 'contactInfo' }
        ]
        self.getWidgets = function () { return self.widgets; }
     



    }

    angular.module('eliApp')
    .service('ScrollService', ['$resource', '$state', ScrollService])
}());