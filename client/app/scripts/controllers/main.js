'use strict';

angular.module('eliApp')
  .controller('MainCtrl', function ($http,$scope,$resource,StudentService) {
  	var self=this;
     self.date='';
    var Students= {"FirstName":"7","LastName":"7"};
       var bookData = {  "BookId": 0, "ISBN": "32334833425543",
                 "Title": "WCF RESTful Service by Example"};

var s="sarqq";
var objArray = '';
                 var obj = {
                        id:"test",
                        taskIds: 1,
                        action: "Karin",
                        userName: "Sari"
                  };
                 objArray = new Array();
                 objArray.push(obj);

/*  var postPromise=$http({
         method : 'POST',
            url : 'http://localhost:51073/Service.svc/Tasks',
            data: JSON.stringify(obj),
        });*/


////////GET EXAMPLE
  var myGet=StudentService;
  var user;
$scope.getme=function(){
 // for(var i=0;i<5;i++){
      user=myGet.get({ id: 1 }, function(data) {
              self.date=data;
              console.log(self.date)
              console.log(user)
         

              
              });     //}
    }
     $scope.saveme=function(){
     myGet.save(obj,function(d) {
              self.w=d;
              console.log(self.w)
              
              });}
     $scope.updateme=function(){
     user.$update(function(d) {
              self.w=d;
              console.log(self.w)
              
              });}
      $scope.deleteme=function(){
     user.$remove(function(d) {
              self.w=d;
              console.log(self.w)
              
              });}




  });
angular.module('eliApp').factory('StudentService', function ($resource) {
    return $resource('http://localhost:81\:81/Service.svc/Tasks/TasksForMerge/:id',{id:'@id'},{update: {method: 'PUT'}});
});