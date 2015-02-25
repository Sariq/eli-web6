(function () {
    function UserListController($scope, UserAdmin, $stateParams, ngTableParams, $filter) {
    var self = this;
    console.log(UserAdmin);
    self.users = UserAdmin.query();

    self.users.$promise.then(function (result) {
        console.log(result);
        self.data = result;
        self.myFun();
    });


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


    self.remove = function (user) {

        user.$remove({id: user._id}, function () {
          self.users = UserAdmin.query();
        });
      };
  }

  angular.module('eli.admin')
    .controller('UserListController', ['$scope','UserAdmin', '$stateParams','ngTableParams','$filter', UserListController]);
}());
















