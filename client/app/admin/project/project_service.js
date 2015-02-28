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
        var project = {
            label: '',
            children: []
 
        };
        self.project = new self.projectResource(project)
        return self.project;
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

 


  }

    angular.module('AbnTest')
    .service('ProjectService', ['$resource', 'localStorageService', ProjectService])
}());