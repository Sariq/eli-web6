(function () {
                                                                                                                              
  function UserAdmin($resource,AuthService) {
    var self = this;

    self.user = AuthService.getUserInfo();
   
    self.userResource = $resource('/UserService.svc/api/:id', {},
      {update: {method: 'PUT'}}
    );

    self.getUsers = function () {
        return self.userList;
    }
    self.get = function (user_id) {
        self.user = self.userResource.get({ id: user_id });
        console.log("GEEEEEEEEEEtUSSSSSSSer")
        console.log(self.user)
        return self.user;
    };

    self.save = function (user) {
      return self.userResource.save();
    };

    self.create = function(){
        var user = {
            userId:'',
            password: '',
            name: '',

        address: '',
            //birthDate:''
        };


        self.user = new self.userResource(user)
        return self.user;
    };

      self.deleteTask = function (idx,user) {

        user.configurations.splice(idx,1);
        console.log(user)

    };


      self.addPatient = function (user, patientId) {
         
   
          user.patients.push(patientId);
         
     
      }
      self.deletePatient = function (user, idx) {
          return user.patients.splice(idx, 1);
      };
      self.addProject = function (user, projectId) {
          console.log(user)
          user.projects.push(projectId);
      }
      self.deleteProject = function (user, idx) {
          return user.projects.splice(idx, 1);
      };

      

      //reminder add/delete
      self.addReminder = function (reminderId) {
          console.log(reminderId)
          console.log("selfReminder000");
          console.log(self.user.reminders)
          self.user.reminders.push(reminderId);
          //self.user.update().$promise.then(function () { alert("good reminder") }, function () { alert("error reminder") })
          console.log("selfReminder");
          console.log(self.user.reminders)
          AuthService.setUserInfo(self.user);
          self.update();
          console.log(self.user)
      }
      self.deleteReminder = function (user, idx) {
          return user.reminders.splice(idx, 1);
      };



    self.query = function (){
      return self.userResource.query();
    };

    self.listUsers = function(){
      return self.userResource.query()
    };



    self.setUserList = function (userList) {
        self.userList = userList;
    }
    self.getUserList = function () {
        return self.userList;
    }
    self.update = function () {
        
        return self.userResource.update(AuthService.getUserInfo())

    }
    self.updateUser = function (user) {

        return self.userResource.update(user)

    }



  }

    angular.module('eli.admin')
    .service('UserAdmin', ['$resource', 'AuthService', UserAdmin])
}());