(function () {
    /** ContactUs Controller
     *
     * @param $location:
     * @param ContactUsAdmin: Service
     * @constructor
     */
    function ContactUsAddController($location, $state, ContactUsAdmin, $stateParams) {
        var self = this;
        self.isNew = false;

        self.contactUsId = $stateParams.contactUsId;
 

        //Checks Add or Update
        if (self.contactUsId) {
            self.contactUs = ContactUsAdmin.getContactUs();
        } else {
            self.isNew = true;
            self.contactUs = ContactUsAdmin.create();
        }
        //Save or update contactUs
        self.save = function () {
            if (self.isNew) {
                self.contactUs.$save(function (response) {
                
                });
            } else {
                ContactUsAdmin.update(self.contactUs).$promise.then(function () {
                   // $location.path('/contactUs/item/' + self.contactUs._id + '/' + self.index);
                })
            }
        };
    }
    angular.module('eli.common')
        .controller('ContactUsAddController', ['$location','$state', 'ContactUsAdmin', '$stateParams', ContactUsAddController]);
}());










