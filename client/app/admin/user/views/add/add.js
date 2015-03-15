(function () {
    /** User Controller
     *
     * @param $location:
     * @param UserAdmin: Service
     * @constructor
     */
    function UserAddController($location, $scope, UserAdmin, $stateParams, RoleService) {
        var self = this;
        self.error = '';
        self.debug = '';
        self.isNew = false;
        self.info = UserAdmin.info;
        self.roleList=RoleService.query();
        self.roleList.$promise.then(function (response) { console.log(response) })
   
        self.userId = $stateParams.userId;
        self.meetingId = $stateParams.meetingId;
        //alert($stateParams.userId)
        self.steps = [];

       

        self.isValid = function () {
            return true;
        };

        if (self.userId) {

            self.user = UserAdmin.get($stateParams.userId);
            self.user.$promise.then(function (result) {
                console.log(self.user);
              
            })

        } else {
            self.isNew = true;
            self.user = UserAdmin.create();
        }

      
       

        self.save = function () {
           
            var success_url = '/users';
            if (self.configurationId) {
                success_url = success_url + '/' + self.user;

            }
            if (self.isNew) {

                console.log(self.user);
                self.user.$save(function (response) {
                    console.log(response);
                   
                        $location.path(success_url);
                   
                        
                   
                });
            } else {
              
                self.user.$update(function (response) {
                    console.log(response);
                
                    $location.path('user/profile/' + self.user._id);
                 
                });
            }
        };



        self.addRole = function (role) {
            self.user.role.push(role._id);
            self.get_add_groups();
        };






    }

    angular.module('eli.admin')
        .controller('UserAddController', ['$location', '$scope', 'UserAdmin', '$stateParams','RoleService', UserAddController]);
}());










