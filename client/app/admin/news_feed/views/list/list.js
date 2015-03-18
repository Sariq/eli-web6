(function () {
    function NewsListController($scope, NewsFeedService, $http, $stateParams, PatientAdmin, $filter, ngTableParams) {
    var self = this;

 
    //self.patient = PatientAdmin.patient;
    
    console.log(self.patient)
    self.op1 = false;
    self.op2 = true;
    self.op3 = false;
    self.newsFeed = NewsFeedService.getNews();

    self.newsFeed.$promise.then(function (result)
    {
        self.tableData();
    }
        , function () { alert("getAssignmentsByIds edit error") });
     






    self.tableData = function () {
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            sorting: {
                title: 'asc'     // initial sorting
            }
        }, {
            total: self.newsFeed.length, // length of self.data
            getData: function ($defer, params) {
                // use build-in angular filter
                var orderedData = params.sorting() ?
                                    $filter('orderBy')(self.newsFeed, params.orderBy()) :
                                    self.data;

                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }

        });
    }


 

   
  }

  angular.module('eli.admin')
    .controller('NewsListController', ['$scope', 'NewsFeedService', '$http', '$stateParams', 'PatientAdmin', '$filter', 'ngTableParams', NewsListController]);
}());
















