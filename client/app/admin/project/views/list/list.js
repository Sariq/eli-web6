(function () {
    function ProjectListController(UserAdmin, $stateParams, $scope, $filter, ngTableParams, ProjectService) {
    var self = this;

    self.projects = ProjectService.query();
    self.data;
     

    self.projects.$promise.then(function (result) {
        console.log(result);
        self.data = result;
        self.myFun();

    });


    self.myFun = function () {
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

    self.setProjectId = function (project) {
 
        ProjectService.setProjectId(project._id)
    }
     self.remove = function (project) {
        console.log(project);
        console.log(project._id);
        project.$remove({id: project._id}, function () {
            self.projects = ProjectService.query();
        });
      };
  }

  angular.module('eli.admin')
    .controller('ProjectListController', ['UserAdmin', '$stateParams','$scope', '$filter', 'ngTableParams','ProjectService', ProjectListController]);
}());














