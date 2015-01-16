(function () {

  function AuthService($resource) {


   
    var self = this;
    self.authResource = $resource('http://localhost:82\:82/UserService.svc/SignIn/:id', {}, { update: { method: 'PUT' } });


    self.get = function(auth_id){
      return self.authResource.get({id:auth_id },function(d) {
              self.w=d;
             // console.log(self.w)
              });
    };




    self.create = function(){
      var user = {UserId: '',
        Password: ''
      };
      return new self.authResource(user);
    };

    self.query = function (){
      return self.authResource.query();
    };

      self.load= function() {
      return $http.get('/api/v1/auth');
    }
      self.logout= function() {
      return $http.get('/api/v1/auth/logout');
    }
    self.login= function(inputs) {
      return inputs.$save();
    }
    self.register= function(inputs) {
      return $http.post('/api/v1/auth/register', inputs);
    }
    self.locations= function() {
      return $http.get('/api/v1/auth/locations');
    }
    self.check= function() {
      return $http.get('/api/v1/auth/check');
    }











    return self;
  }

  angular.module('eliApp')
    .service('AuthService', ['$resource',AuthService])
}());
      