(function () {
                                                                                                                              
  function ReportService($resource) {
    var self = this;

    self.reportResource = $resource('/ReportService.svc/api/:id', {},
      {update: {method: 'PUT'}}
    );

    self.query = function () {
        return self.reportResource.query();
    };
    self.get = function (report_id) {
      
      return self.reportResource.get({id:report_id });
    };

    self.addTask = function (report, task) {
        report.assignments.push(task);
    };

    self.deleteAssignment = function (report, idx) {
        return report.assignments.splice(idx, 1);
    };

    self.save = function (report) {
      return self.reportResource.save();
    };

    self.create = function(){
        var report = {
            therapistId: '',
            patientId: '',
            title: '',
            address: '',
            assignments:[],
            note: ''
        };






    
      return new self.reportResource(report);
    };

      self.deleteReport = function (idx,report) {

        report.configurations.splice(idx,1);
        console.log(report)

    };

    self.addReport= function(report){
        report.reports.push({
            title: '',
            content: '',
            done: false
      });
    }

 

    self.listReports = function () {
        console.log("meeeting")
      return self.reportResource.query()
    };


    return self;



  }

    angular.module('eli.admin')
    .service('ReportService', ['$resource',ReportService])
}());