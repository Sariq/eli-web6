(function () {

    function PatientAdmin($resource, localStorageService) {
        var self = this;
        self.patient = '';

        //Patient Resource
        self.patientResource = $resource('/PatientService.svc/api/:id', {},
          { update: { method: 'PUT' } }
        );

        //Get Patient full list
        self.query = function () {
            return self.patientResource.query();
        };
        //Get Patinet by ID
        self.get = function (patient_id) {
            return self.patientResource.get({ id: patient_id });
        };

        //Remove Patient from DB
        self.remove = function (patient) {
            self.patientResource.remove({ id: patient._id })
        }

        //Set Patient data
        self.setPatient = function (patient) {
            return localStorageService.set("patient", patient);
        };

        //Get Patient data
        self.getPatient = function () {
            return localStorageService.get("patient");
        };

        //Add contact in Patient contacts array
        self.addContact = function (patient) {
            patient.contacts.push({ name: '', phoneNumber: '', age: '', isContact: false });
        }
        
        //Update Patient data in DB
        self.update = function (patient) {
            return self.patientResource.update(patient)
        }

        //Creat Patient Object
        self.create = function () {
            var patient = {
                identityNumber: '',
                name: '',
                education: '',
                workplace: '',
                birthDate: '',
                address: '',
                email: '',
                meetings: [],
                contacts: []
            };
            self.patient = new self.patientResource(patient)
            return self.patient;
        };

        /////////////////////////////









        self.save = function (patient) {
            return self.patientResource.save();
        };


        self.deleteTask = function (idx, patient) {

            patient.configurations.splice(idx, 1);
            console.log(patient)

        };



        self.addMeeting = function (patient, meetingId) {
            console.log(patient)
            patient.meetings.push(meetingId);
        }
        self.deleteMeeting = function (patient, idx) {
            return patient.meetings.splice(idx, 1);
        };




        self.listPatients = function () {
            return self.patientResource.query()
        };





       
        self.clearPatientId = function () {

            return localStorageService.remove("patient");
        }


        return self;



    }

    angular.module('eli.admin')
    .service('PatientAdmin', ['$resource', 'localStorageService', PatientAdmin])
}());