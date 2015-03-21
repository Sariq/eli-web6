(function () {
                                                                                                                              
    function UserAdmin($resource, AuthService, localStorageService, $rootScope) {
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
       localStorageService.set("userInfo", self.user);
      
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
          self.userIngoHttp = self.get(self.user._id);
          self.userIngoHttp.$promise.then(function (response) {
           //   alert(angular.toJson(response))
              response.reminders.push(reminderId);
              AuthService.setUserInfo(response);
              self.update();
                self.userResource.update(response)
              $rootScope.$broadcast("newReminder");
          })


      }
      self.deleteReminder = function (user, idx) {
          return user.reminders.splice(idx, 1);
      };



      self.query = function () {
          console.log(self.userResource.query())
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
    self.fromUserToId = function (message) {
        self.userList = self.getUserList();
        for (var i = 0; i < self.userList.length; i++) {
         
            if (self.userList[i].userId == message.fromUser[0]) {
                message.fromUser[0] = self.userList[i]._id;
                break;
                }
        }
        return message;
    }



  }

    angular.module('eli.admin')
    .service('UserAdmin', ['$resource', 'AuthService','localStorageService','$rootScope', UserAdmin])
}());