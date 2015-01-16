(function () {
    function PatientListController(PatientAdmin, $stateParams) {
    var self = this;
    console.log(PatientAdmin);
    self.patients = PatientAdmin.query();




     self.remove = function (patient) {
        console.log(patient);
        console.log(patient._id);
        patient.$remove({_id: patient._id}, function () {
          self.patients = PatientAdmin.query();
        });
      };
  }

  angular.module('eli.admin')
    .controller('PatientListController', ['PatientAdmin', '$stateParams', PatientListController]);
}());
















