(function () {
                                                                                                                              
  function PatientAdmin($resource) {
    var self = this;
    self.info ={
      os:['linux','windows'],
      stages:['DOCS','TF', 'QL', 'Production'],
      locations:['apc', 'afula']
    };

    self.patientResource = $resource('/PatientService.svc/api/:id', {},
      {update: {method: 'PUT'}}
    );

    self.get = function(patient_id){
      return self.patientResource.get({id:patient_id });
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
      return new self.patientResource(patient);
    };

      self.deleteTask = function (idx,patient) {

        patient.configurations.splice(idx,1);
        console.log(patient)

    };

      self.addMeeting = function (patient, meetingId) {
          console.log(patient)
          patient.meetings.push(meetingId);
      }


    self.query = function (){
      return self.patientResource.query();
    };

    self.listPatients = function(){
      return self.patientResource.query()
    };


    return self;



  }

    angular.module('eli.admin')
    .service('PatientAdmin', ['$resource',PatientAdmin])
}());