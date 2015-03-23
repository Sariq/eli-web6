(function () {
    function ContactUsItemController($location, $state, ContactUsAdmin, $stateParams, $modal, PatientAdmin, TaskAdmin) {

        var self = this;
        self.isNew = false;
        self.contactUsId = $stateParams.contactUsId;
        self.index = $stateParams.index;
        self.patient = PatientAdmin.getPatient();


        //Get ContactUs and assignments
        if (self.contactUsId) {
            self.contactUs = ContactUsAdmin.get(self.contactUsId);
            self.contactUs.$promise.then(function (reponse) {
               
            });
        }
        self.remove = function (idx, contactUs) {
            ContactUsAdmin.remove(contactUs).$promise.then(function () {

            })
        };



    }

    angular.module('eli.admin')
        .controller('ContactUsItemController', ['$location', '$state', 'ContactUsAdmin', '$stateParams', '$modal', 'PatientAdmin', 'TaskAdmin', ContactUsItemController]);
}());










