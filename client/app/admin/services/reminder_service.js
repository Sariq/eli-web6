(function () {
                                                                                                                              
    function ReminderService($resource, $http) {
    var self = this;
    self.taskId = '';

    self.reminderResource = $resource('/ReminderService.svc/api', {},
      {update: {method: 'PUT'}}
    );

    self.setTaskId = function (id) {
        self.taskId = id;
    }
    self.getTaskId = function () {
        return self.taskId;
    }
    self.getRemindersByIds = function (reminderIdArr) {
        console.log(reminderIdArr)
        var promise = $http({
            url: '/ReminderService.svc/GetRemindersByIds',
            method: 'POST',
            data: reminderIdArr
        });
        return promise;
    }
    self.update = function (reminder) {
        
        return self.reminderResource.update(reminder)

    }

    self.get = function(reminder_id){
      return self.reminderResource.get({_id:reminder_id });
    };

    self.save = function (reminder) {
      return self.reminderResource.save();
    };

    self.create = function(){
        var reminder = {
            title: '',
            content: '',
            done: false
      };
      return new self.reminderResource(reminder);
    };

      self.deleteReminder = function (idx,reminder) {

        reminder.configurations.splice(idx,1);
        console.log(reminder)

    };

    self.addReminder= function(reminder){
        reminder.reminders.push({
            title: '',
            content: '',
            done: false
      });
    }

    self.query = function (){
      return self.reminderResource.query();
    };

    self.listReminders = function(){
      return self.reminderResource.query()
    };






  }

    angular.module('eli.admin')
    .service('ReminderService', ['$resource','$http',ReminderService])
}());