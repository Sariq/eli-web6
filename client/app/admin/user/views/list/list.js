(function () {
    function UserListController(UserAdmin, $stateParams) {
    var self = this;
    console.log(UserAdmin);
    self.users = UserAdmin.query();




     self.remove = function (user) {
        console.log(user);
        console.log(user._id);
        user.$remove({_id: user._id}, function () {
          self.users = UserAdmin.query();
        });
      };
  }

  angular.module('eli.admin')
    .controller('UserListController', ['UserAdmin', '$stateParams', UserListController]);
}());
















