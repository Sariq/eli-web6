(function () {
                                                                                                                              
  function MeetingAdmin($resource) {
    var self = this;
    self.info ={
      os:['linux','windows'],
      stages:['DOCS','TF', 'QL', 'Production'],
      locations:['apc', 'afula']
    };

    self.meetingResource = $resource('/MeetingService.svc/api/:id', {},
      {update: {method: 'PUT'}}
    );

    self.get = function (meeting_id) {
      
      return self.meetingResource.get({id:meeting_id });
    };

    self.addTask = function (meeting, task) {
        meeting.assignments.push(task);
    };                       

    self.save = function (meeting) {
      return self.meetingResource.save();
    };

    self.create = function(){
        var meeting = {
            therapistId: '',
            patientId: '',
            title: '',
            address: '',
            assignments:[],
            note: ''
        };






    
      return new self.meetingResource(meeting);
    };

      self.deleteMeeting = function (idx,meeting) {

        meeting.configurations.splice(idx,1);
        console.log(meeting)

    };

    self.addMeeting= function(meeting){
        meeting.meetings.push({
            title: '',
            content: '',
            done: false
      });
    }

    self.query = function (){
      return self.meetingResource.query();
    };

    self.listMeetings = function () {
        console.log("meeeting")
      return self.meetingResource.query()
    };


    return self;



  }

    angular.module('eli.admin')
    .service('MeetingAdmin', ['$resource',MeetingAdmin])
}());