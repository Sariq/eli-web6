(function () {
    function PatientListController(PatientAdmin, $scope, $filter, ngTableParams) {
        var self = this;
        self.patients = PatientAdmin.query();

        self.patients.$promise.then(function (result) {
            self.data = result;
            self.tableData();
        });
         //Update table data
        self.tableData = function () {
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    _date: 'desc'     // initial sorting
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
      .controller('PatientListController', ['PatientAdmin', '$scope', '$filter', 'ngTableParams', PatientListController]);
}());














