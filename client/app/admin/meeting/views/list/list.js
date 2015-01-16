(function () {
  function MeetingListController(MeetingAdmin,$stateParams) {
    var self = this;
    console.log(MeetingAdmin);
    self.meetings = MeetingAdmin.listMeetings();
                        
    self.op1 = false;
    self.op2 = true;
    self.op3 = false;
     self.remove = function (meeting) {
        console.log(meeting);
        console.log(meeting._id);
        alert(meeting._id)
        meeting.$remove({id: meeting._id}, function () {
          self.meetings = MeetingAdmin.query();
        });
      };
  }

  angular.module('eli.admin')
    .controller('MeetingListController', ['MeetingAdmin','$stateParams',MeetingListController]);
}());
















