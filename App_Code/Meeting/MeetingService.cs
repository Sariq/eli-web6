﻿using System.Collections.Generic;
using System.Diagnostics;


public class MeetingService : DatabaseActions, IMeeting
{
    public Meeting AddMeeting(Meeting meeting)
    {
        var meetingId = InsertObjectAndReturnId(meeting, "Meeting").Result;
        Meeting dbMeeting = GetMeeting(meetingId);
        return dbMeeting;
    }

    public void RemoveMeeting(string meetingId)
    {
    
        UpdateObjects("_id", meetingId, "Meeting", "isDelete", true);
        //RemoveObject(meetingId, "Meeting");
    }

    public void UpdateMeeting(Meeting metting)
    {
        UpdateObject(metting, "Meeting");
    }

    public Meeting GetMeeting(string mettingId)
    {
        return GetObject<Meeting>(mettingId, "Meeting").Result;
    }

    public List<Meeting> GetAllMeetings()
    {
        return GetAllObject<Meeting>("Meeting");
    }

    public List<Meeting> GetMeetingsByIds(List<string> tmpMeetings)
    {
        return GetAllObject<Meeting>(tmpMeetings, "Meeting");
    }

    public List<Assignment> GetAssignmentOfMeeting(string meetingId)
    {
        var meeting = GetMeeting(meetingId);
        var allAssignment = new AssignmentService().GetAssignmentsByIds(meeting.assignments);
        return allAssignment;
    }

}