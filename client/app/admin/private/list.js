(function () {
    function PrivateCtrl($scope, UserAdmin, $stateParams, ngTableParams, $filter, $http, AuthService, ipCookie) {
        var self = this;
        self.userInfo = AuthService.getUserInfo();
    //    alert(self.userInfo._id)
    //    $http.post('/UserService.svc/GetAssignmentsOfUser', self.userInfo._id).
    //success(function (data, status, headers, config) {
    //      console.log(data)
    //}).error(function (data, status, headers, config) { alert("Project Add") });


//        $http.post('/UserService.svc/GetPatientsOfUser', self.userInfo._id).
//success(function (data, status, headers, config) {
//    console.log(data)
//}).error(function (data, status, headers, config) { alert("Project Add") });
        self.myTestFun = function () {
           
           // $scope.id_token = getResponseHeaders()['id_token'];
            ipCookie('id_token', 'tesssssssssssss', { expires: 30 })
        }
   
        $http.post('/UserService.svc/GetMeetingsOfUser', self.userInfo._id).
success(function (data, status, headers, config) {
    console.log(data)
}).error(function (data, status, headers, config) { alert("Project Add") });


  }

  angular.module('eli.admin')
    .controller('PrivateCtrl', ['$scope','UserAdmin', '$stateParams','ngTableParams','$filter','$http','AuthService','ipCookie', PrivateCtrl]);
}());
















