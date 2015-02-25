(function () {
    /** User Controller
     *
     * @param $location:
     * @param UserAdmin: Service
     * @constructor
     */
    function UserProfileController($location, $scope, UserAdmin, $stateParams) {
        var self = this;
        // self.profile = $stateParams.userId;
        self.profile = UserAdmin.get($stateParams.userId);
        self.profile.$promise.then(function (result) {
            console.log(self.profile);

        });
        if (self.profileId) {
            self.profile = UserAdmin.get(self.profileId);

        }


        self.remove = function (user) {
            
            user.$remove({ id: user._id }, function () {

                $location.path('users');
            });
        };
    }
    angular.module('eli.admin')
        .controller('UserProfileController', ['$location', '$scope', 'UserAdmin', '$stateParams', UserProfileController]);
}());










