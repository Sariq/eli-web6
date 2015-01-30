(function () {
                                                                                                                              
  function UserAdmin($resource) {
    var self = this;
    self.info ={
      os:['linux','windows'],
      stages:['DOCS','TF', 'QL', 'Production'],
      locations:['apc', 'afula']
    };
    self.user = '';

    self.userResource = $resource('/UserService.svc/api/:id', {},
      {update: {method: 'PUT'}}
    );

    self.get = function (user_id) {
        self.user = self.userResource.get({ id: user_id });
       
        return self.user;
    };

    self.save = function (user) {
      return self.userResource.save();
    };

    self.create = function(){
        var user = {
            userId:'',
            password: '',
            first_name: '',
            last_name: '',
        address: '',
        //role:''
        };


        self.user = new self.userResource(user)
        return self.user;
    };

      self.deleteTask = function (idx,user) {

        user.configurations.splice(idx,1);
        console.log(user)

    };

      self.addMeeting = function (user, meetingId) {
          console.log(user)
          user.meetings.push(meetingId);
      }
      self.deleteMeeting = function (user, idx) {
         return user.meetings.splice(idx, 1);
      };


    self.query = function (){
      return self.userResource.query();
    };

    self.listUsers = function(){
      return self.userResource.query()
    };


    return self;



  }

    angular.module('eli.admin')
    .service('UserAdmin', ['$resource',UserAdmin])
}());