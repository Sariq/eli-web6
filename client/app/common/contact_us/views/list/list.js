(function () {
    function ContactUsListController($scope, ContactUsAdmin, $filter, ngTableParams) {
        var self = this;
       

        //Get Patient ContactUss
        self.getContactUs = function () {
            
            ContactUsAdmin.contactUsResource.query().$promise.then(function (response) {
                    //self.contactUsList = response;
                    self.data = response;
                    self.tableData();
                })
          
        }
        self.getContactUs()

        //Update table data
        self.tableData = function () {
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
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

    angular.module('eli.common')
      .controller('ContactUsListController', ['$scope', 'ContactUsAdmin','$filter', 'ngTableParams', ContactUsListController]);
}());
















