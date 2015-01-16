using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;


public class MeetingService : DatabaseActions, IMeeting
{
    public void AddMeeting(Meeting meeting)
    {
        InsertObject(meeting, "Meeting");     
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

    public List<Assignment> GetAllAssignmentsOfMeeting(string meetingId)
    {
        List<Assignment> assignments = new List<Assignment> { };
        Meeting meeting = GetMeeting(meetingId);
        foreach (string assignmentId in meeting.assignments) 
        {
            Assignment assignment = GetObject<Assignment>(assignmentId, "Assignment").Result;
            assignments.Add(assignment);
        }
        return assignments;
    }

}