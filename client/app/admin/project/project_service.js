(function () {
                                                                                                                              
    function ProjectService($resource, localStorageService) {
    var self = this;

    self.project = '';

    self.projectResource = $resource('/ProjectService.svc/api/:id', {},
      {update: {method: 'PUT'}}
    );

    self.get = function (project_id) {
        self.project = self.projectResource.get({ id: project_id });
       
        return self.project;
    };

    self.save = function (project) {
      return self.projectResource.save();
    };
    
    //self.addChildren = function (children) {
    //    return self.projectResource.save();
    //};
    self.create = function(){
        var project = [{
            label: 'prj1', children: [{
                label: 'Dog',
                data: {
                    description: "man's best friend", to: []
                }
            },
    {
        label: 'Dog2',
        data: {
            description: "man's best friend2", to: []
        }
    }
            ]
        }];



        self.project = new self.projectResource(project)
        return project;
    };

      self.deleteTask = function (idx,project) {

        project.configurations.splice(idx,1);
        console.log(project)

    };

      self.addMeeting = function (project, meetingId) {
          console.log(project)
          project.meetings.push(meetingId);
      }
      self.deleteMeeting = function (project, idx) {
         return project.meetings.splice(idx, 1);
      };


    self.query = function (){
      return self.projectResource.query();
    };

    self.listProjects = function(){
      return self.projectResource.query()
    };


    self.setProjectId = function (project) {

            return localStorageService.set("project", project);
    };
    self.remove = function () {
        alert(self.getProjectId()._id)
        self.projectResource.remove({ id: self.getProjectId()._id })

    }
    self.update = function () {
        alert(self.getProjectId()._id)
        return self.projectResource.update( self.getProjectId() )

    }
    self.getProjectId = function () {
        return localStorageService.get("project");
    };
    self.clearProjectId = function () {

        return localStorageService.remove("project");
    }

    self.setTask = function (task) {
        return localStorageService.set("projectTask", task);
    }
    self.getTask = function () {
        return localStorageService.get("projectTask");
    }


    self.setUserPrjId = function (UserPrjId) {
        return localStorageService.set("UserPrjId", UserPrjId);
    }
    self.getUserPrjId = function () {
        return localStorageService.get("UserPrjId");
    }


  }

    angular.module('AbnTest')
    .service('ProjectService', ['$resource', 'localStorageService', ProjectService])
}());