(function () {
    function ReportListCtrl($scope, $http, $stateParams, PatientAdmin, $filter, ngTableParams, ReportService) {
        var self = this;

        self.reportList = ReportService.query();
        self.reportList.$promise.then(function (response) {
            self.data = response;
            console.log(self.data)
            self.myFun();
        });


        //self.getReportsByIds=function(){
        //    console.log(self.patient.reports);
        //    self.patient.$promise.then(function (result) {
        //        if (self.patient.reports != null) {
        //            $http({
        //                url: '/ReportService.svc/GetReportsByIds',
        //                method: 'POST',
        //                data: self.patient.reports
        //            }).then(function (response) {

        //                self.reports = response.data;
        //                self.data = response.data;
        //                console.log(self.data)
        //                self.myFun();

        //            }, function () { alert("getAssignmentsByIds edit error") });
        //        }

        //    });

        //}



        self.myFun = function () {
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    title: 'asc'     // initial sorting
                }
            }, {
                total: self.data.length, // length of self.data
                getData: function ($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.sorting() ?
                                        $filter('orderBy')(self.data, params.orderBy()) :
                                        self.data;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }

            });
        }



        self.remove = function (idx, report) {
            console.log(report);
            console.log(report._id);


            $http({
                url: '/ReportService.svc/deleteReport',
                method: 'POST',
                data: report._id
            }).then(function (response) {
                PatientAdmin.deleteReport(self.patient, idx);
                self.patient.$update(function (response) {

                    self.getReportsByIds()

                });

            }, function () { alert("getAssignmentsByIds edit error") });

            //report.$remove({id: report._id}, function () {
            //  self.reports = ReportAdmin.query();
            //});
        };


    }

    angular.module('eli.admin')
      .controller('ReportListCtrl', ['$scope', '$http', '$stateParams', 'PatientAdmin', '$filter', 'ngTableParams', 'ReportService', ReportListCtrl]);
}());
















