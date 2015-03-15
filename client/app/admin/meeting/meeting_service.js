(function () {

    function MeetingAdmin($resource, localStorageService) {
        var self = this;

        //Meeting Resource
        self.meetingResource = $resource('/MeetingService.svc/api/:action:id', { id: "@id", action: "@action"},
          {
              update: { method: 'PUT' },
              getMeetingsByIds: {
                  method: 'POST', params: { action: 'getMeetingsByIds' }, isArray: true
              }
          }
        );

        //Get Meeting by Id from DB
        self.get = function (meeting_id) {
            return self.meetingResource.get({ id: meeting_id });
        };
        //Remove meeting from DB (toggle isDelete)
        self.remove = function (meeting) {
            return self.meetingResource.remove({ id: meeting._id })
        }

        //Update Meeting data in DB
        self.update = function (meeting) {
            return self.meetingResource.update(meeting)
        }

        //Create meeting object
        self.create = function () {
            var meeting = {
                therapistId: '',
                patientId: '',
                title: '',
                address: '',
                assignments: [],
                note: ''
            };
            return new self.meetingResource(meeting);
        };

        //Set Patient data
        self.setMeeting = function (meeting) {
            return localStorageService.set("meeting", meeting);
        };

        //Get Patient data
        self.getMeeting = function () {
            return localStorageService.get("meeting");
        };

        self.addTask = function (meeting, task) {
            meeting.assignments.push(task);
        };
        self.deleteAssignment = function (meeting, idx) {
            return meeting.assignments.splice(idx, 1);
        };
        ////////////////







        //self.save = function (meeting) {
        //    return self.meetingResource.save();
        //};

        //self.deleteMeeting = function (idx, meeting) {

        //    meeting.configurations.splice(idx, 1);
        //    console.log(meeting)

        //};

        //self.addMeeting = function (meeting) {
        //    meeting.meetings.push({
        //        title: '',
        //        content: '',
        //        done: false
        //    });
        //}

        //self.query = function () {
        //    return self.meetingResource.query();
        //};

        //self.listMeetings = function () {
        //    console.log("meeeting")
        //    return self.meetingResource.query()
        //};





    }

    angular.module('eli.admin')
    .service('MeetingAdmin', ['$resource', 'localStorageService', MeetingAdmin])
}());