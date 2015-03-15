(function () {
                                                                                                                              
    function RoleService($resource,AuthService) {
    var self = this;
    self.userInfo = AuthService.getUserInfo();
    self.roleResource = $resource('/RoleService.svc/api/:id', {},
      {update: {method: 'PUT'}}
    );

    self.query = function () {
        return self.roleResource.query();
    };
    self.get = function (role_id) {
      
      return self.roleResource.get({id:role_id });
    };
    self.setRoleList = function (roleList) {
        self.roleList = roleList;
    };
    
    self.hasPermission = function (role) {
        //  alert()
        var flag = false;
        angular.forEach(self.roleList, function (value, key) {
             
            if (value.role == role) {
                if (self.userInfo.role == value._id) {
                   
                    flag = true;
                    
                }
            }
          
        });
        console.log(flag);
        return flag;
    }
    
   
  }

    angular.module('eli.admin')
    .service('RoleService', ['$resource','AuthService',RoleService])
}());