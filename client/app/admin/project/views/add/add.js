(function () {
    /** Project Controller
     *
     * @param $location:
     * @param ProjectService: Service
     * @constructor
     */
    function ProjectAddController($location, $scope, ProjectService, $stateParams, UserAdmin, AuthService) {
        var self = this;

        self.isNew = false;
        self.userInfo = AuthService.getUserInfo();
  
   
        self.projectId = $stateParams.projectId;



       



        if (self.projectId) {
                                                                                                                                                      
            self.project = ProjectService.get($stateParams.projectId);
            self.project.$promise.then(function (result) {
                console.log(self.project);
                if (typeof (self.meetingId) != 'undefined') {

                    ProjectService.addMeeting(self.project, self.meetingId);
                   // alert(angular.toJson(self.project))
                    self.project.$save(function (response) {
                        //alert(angular.toJson(response))
                    });
                }

            });

        } else {
            self.isNew = true;
            self.project = ProjectService.create();
            console.log(self.project)
        }

      
     

        self.save = function () {
           
            var success_url = '/project/list';
            if (self.configurationId) {
                success_url = success_url + '/' + self.project;

            }
            if (self.isNew) {
              

                self.project.$save(function (response) {
                    console.log(response);
                   
                    UserAdmin.addProject(self.userInfo, response._id)
                    AuthService.setUserInfo(self.userInfo);
                    UserAdmin.updateUser(self.userInfo);
                    console.log(self.userInfo);
                    $location.path(success_url);
                   
                        
                   
                });
            } else {
              
                self.project.$update(function (response) {
                    console.log(response);
                    ProjectService.setProjectId(self.project)
                    $location.path('/project/profile/' + self.project._id);
                 
                });
            }
        };





      



    }

    angular.module('eli.admin')
        .controller('ProjectAddController', ['$location', '$scope', 'ProjectService', '$stateParams','UserAdmin','AuthService', ProjectAddController]);
}());










