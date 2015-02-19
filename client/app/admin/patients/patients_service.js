(function () {
                                                                                                                              
    function PatientAdmin($resource, localStorageService) {
    var self = this;
    self.info ={
      os:['linux','windows'],
      stages:['DOCS','TF', 'QL', 'Production'],
      locations:['apc', 'afula']
    };
    self.patient = '';

    self.patientResource = $resource('/PatientService.svc/api/:id', {},
      {update: {method: 'PUT'}}
    );

    self.get = function (patient_id) {
        self.patient = self.patientResource.get({ id: patient_id });
       
        return self.patient;
    };

    self.save = function (patient) {
      return self.patientResource.save();
    };

    self.create = function(){
        var patient = {
        identity_number:'',
        first_name: '',
        last_name: '',
        //birth_date: '',
        address: '',
        email:'',
        meetings: []
        };
        self.patient = new self.patientResource(patient)
        return self.patient;
    };

      self.deleteTask = function (idx,patient) {

        patient.configurations.splice(idx,1);
        console.log(patient)

    };

      self.addMeeting = function (patient, meetingId) {
          console.log(patient)
          patient.meetings.push(meetingId);
      }
      self.deleteMeeting = function (patient, idx) {
         return patient.meetings.splice(idx, 1);
      };


    self.query = function (){
      return self.patientResource.query();
    };

    self.listPatients = function(){
      return self.patientResource.query()
    };


    self.setPatientId = function (patient) {

        return localStorageService.set("patient", patient);
    };
    self.getPatientId = function () {
        return localStorageService.get("patient");
    };
    self.clearPatientId = function () {

        return localStorageService.remove("patient");
    }


    return self;



  }

    angular.module('eli.admin')
    .service('PatientAdmin', ['$resource', 'localStorageService', PatientAdmin])
}());