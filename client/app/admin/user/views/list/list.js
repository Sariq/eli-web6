(function () {
    function UserListController($scope, UserAdmin, $stateParams, ngTableParams, $filter) {
    var self = this;
    console.log(UserAdmin);
    self.users = UserAdmin.query();

    self.users.$promise.then(function (result) {
        console.log(result);
        self.data = result;
        //var endTime = new Date()
        //var difference = endTime.getTime() - new Date((parseInt(self.data[0].birth_date.substr(6))));
        //var resultInMinutes = Math.round(difference / 60000);
        //alert(resultInMinutes)
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


    self.remove = function (user) {

        user.$remove({id: user._id}, function () {
          self.users = UserAdmin.query();
        });
      };
  }

  angular.module('eli.admin')
    .controller('UserListController', ['$scope','UserAdmin', '$stateParams','ngTableParams','$filter', UserListController]);
}());
















