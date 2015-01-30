(function () {
    function UserListController(UserAdmin, $stateParams) {
    var self = this;
    console.log(UserAdmin);
    self.users = UserAdmin.query();




    self.remove = function (user) {

        user.$remove({id: user._id}, function () {
          self.users = UserAdmin.query();
        });
      };
  }

  angular.module('eli.admin')
    .controller('UserListController', ['UserAdmin', '$stateParams', UserListController]);
}());
















