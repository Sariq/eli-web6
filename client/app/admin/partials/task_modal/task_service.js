(function () {
                                                                                                                              
  function TaskgAdmin($resource) {
    var self = this;
    self.info ={
      os:['linux','windows'],
      stages:['DOCS','TF', 'QL', 'Production'],
      locations:['apc', 'afula']
    };

    self.taskResource = $resource('/AssignmentService.svc/api/:id', {},
      {update: {method: 'PUT'}}
    );

    self.get = function (task_id) {
      
      return self.taskResource.get({id:task_id });
    };

    self.addTask = function (task,task) {
        task.tasks.push(task);
    };                       

    self.save = function (task) {
      return self.taskResource.save();
    };

    self.create = function(){
        var task = { title: '', user: '', content: '', isDone: false };
    
      return new self.taskResource(task);
    };

      self.deleteTaskg = function (idx,task) {

        task.configurations.splice(idx,1);
        console.log(task)

    };

    self.addTaskg= function(task){
        task.tasks.push({
            title: '',
            content: '',
            done: false
      });
    }

    self.query = function (){
      return self.taskResource.query();
    };

    self.listTaskgs = function () {
        console.log("meeeting")
      return self.taskResource.query()
    };


    return self;



  }

    angular.module('eli.common')
    .service('TaskgAdmin', ['$resource',TaskgAdmin])
}());