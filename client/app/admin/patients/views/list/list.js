(function () {
    function PatientListController(PatientAdmin, $stateParams,$scope, $filter, ngTableParams) {
    var self = this;
    console.log(PatientAdmin);
    self.patients = PatientAdmin.query();
    self.data;
     

    self.patients.$promise.then(function (result) {
        console.log(result);
        self.data = result;
        self.myFun();

    });

    //var self.data = [{ name: "Moroni", age: 50 },
    //        { name: "Tiancum", age: 43 },
    //        { name: "Jacob", age: 27 },
    //        { name: "Nephi", age: 29 },
    //        { name: "Enos", age: 34 },
    //        { name: "Tiancum", age: 43 },
    //        { name: "Jacob", age: 27 },
    //        { name: "Nephi", age: 29 },
    //        { name: "Enos", age: 34 },
    //        { name: "Tiancum", age: 43 },
    //        { name: "Jacob", age: 27 },
    //        { name: "Nephi", age: 29 },
    //        { name: "Enos", age: 34 },
    //        { name: "Tiancum", age: 43 },
    //        { name: "Jacob", age: 27 },
    //        { name: "Nephi", age: 29 },
    //        { name: "Enos", age: 34 }];

    self.myFun = function () {
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            sorting: {
                first_name: 'asc'     // initial sorting
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


     self.remove = function (patient) {
        console.log(patient);
        console.log(patient._id);
        patient.$remove({id: patient._id}, function () {
          self.patients = PatientAdmin.query();
        });
      };
  }

  angular.module('eli.admin')
    .controller('PatientListController', ['PatientAdmin', '$stateParams','$scope', '$filter', 'ngTableParams', PatientListController]);
}());
















