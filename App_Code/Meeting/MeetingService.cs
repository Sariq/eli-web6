﻿using System;
using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;


public class MeetingService : DatabaseActions, IMeeting
{
    public Meeting AddMeeting(Meeting meeting)
    {
        var meetingId = InsertObjectAndReturnId(meeting, "Meeting").Result;
        Meeting dbMeeting = GetMeeting(meetingId);
        return dbMeeting;
    }

    public void RemoveMeeting(string mettingId)
    {
        RemoveObject(mettingId, "Meeting");
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

    public List<Meeting> GetMeetingsByIds(string[] tmpMeetings)
    {
        List<Meeting> meetings = new List<Meeting> { };
        foreach (string meetingId in tmpMeetings)
        {
            Meeting meeting = GetMeeting(meetingId);
            meetings.Add(meeting);
        }
        return meetings;
    }

}