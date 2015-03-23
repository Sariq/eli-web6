(function () {

    function ContactUsAdmin($resource, localStorageService) {
        var self = this;

        //ContactUs Resource
        self.contactUsResource = $resource('/ContactService.svc/api/:action:id', { id: "@id", action: "@action" },
          {
              update: { method: 'PUT' }
            
          }
        );

        //Get ContactUs by Id from DB
        self.get = function (contactUs_id) {
            return self.contactUsResource.get({ id: contactUs_id });
        };
        //Remove contactUs from DB (toggle isDelete)
        self.remove = function (contactUs) {
            return self.contactUsResource.remove({ id: contactUs._id })
        }

        //Update ContactUs data in DB
        self.update = function (contactUs) {
            return self.contactUsResource.update(contactUs)
        }

        //Create contactUs object
        self.create = function () {
            var contactUs = {
                name: '',
                email: '',
                title: '',
                subject: '',
                message: ''
            }


            return new self.contactUsResource(contactUs);
        };

    }

    angular.module('eli.common')
    .service('ContactUsAdmin', ['$resource', 'localStorageService', ContactUsAdmin])
}());