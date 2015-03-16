(function () {

    function ReminderService($resource, $http) {
        var self = this;
        self.taskId = '';

        self.reminderResource = $resource('/ReminderService.svc/api/:action:id', { id: "@id", action: "@action" },
                       {
                           update: { method: 'PUT' },
                           GetRemindersByIds: {
                               method: 'POST', params: { action: 'GetRemindersByIds' }, isArray: true
                           }
                       }
        );

        self.setTaskId = function (id) {
            self.taskId = id;
        }
        self.getTaskId = function () {
            return self.taskId;
        }
        self.get = function (reminder_id) {
            return self.reminderResource.get({ _id: reminder_id });
        };

        ////////////


        self.create = function () {
            var reminder = {
                title: '',
                content: '',
                done: false
            };
            return new self.reminderResource(reminder);
        };


    }

    angular.module('eli.admin')
    .service('ReminderService', ['$resource', '$http', ReminderService])
}());