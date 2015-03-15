(function () {
    function MeetingListController($scope, MeetingAdmin, PatientAdmin, $filter, ngTableParams) {
        var self = this;
        self.patient = PatientAdmin.getPatient();

        //Get Patient Meetings
        self.getMeetingsByIds = function () {
            if (self.patient.meetings != null) {
                MeetingAdmin.meetingResource.getMeetingsByIds(self.patient.meetings).$promise.then(function (response) {
                    self.meetings = response;
                    self.data = response;
                    self.tableData();
                })
            }
        }
        self.getMeetingsByIds()

        //Update table data
        self.tableData = function () {
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
    }

    angular.module('eli.admin')
      .controller('MeetingListController', ['$scope', 'MeetingAdmin', 'PatientAdmin', '$filter', 'ngTableParams', MeetingListController]);
}());
















