(function () {
                                                                                                                              
  function TaskAdmin($resource) {
    var self = this;
    self.info ={
      os:['linux','windows'],
      stages:['DOCS','TF', 'QL', 'Production'],
      locations:['apc', 'afula']
    };

    self.taskResource = $resource('/TaskService.svc/api', {},
      {update: {method: 'PUT'}}
    );

    self.get = function(task_id){
      return self.taskResource.get({_id:task_id });
    };

    self.save = function (task) {
      return self.taskResource.save();
    };

    self.create = function(){
        var task = {
            title: '',
            content: '',
            done: false
      };
      return new self.taskResource(task);
    };

      self.deleteTask = function (idx,task) {

        task.configurations.splice(idx,1);
        console.log(task)

    };

    self.addTask= function(task){
        task.tasks.push({
            title: '',
            content: '',
            done: false
      });
    }

    self.query = function (){
      return self.taskResource.query();
    };

    self.listTasks = function(){
      return self.taskResource.query()
    };


    return self;



  }

    angular.module('eli.admin')
    .service('TaskAdmin', ['$resource',TaskAdmin])
}());