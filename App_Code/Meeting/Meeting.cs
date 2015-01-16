using System;
using System.Runtime.Serialization;

[DataContract]
public class Meeting : DatabaseObject
{
    [DataMember]
    public string therapistId { get; set; }
    [DataMember]
    public string patientId { get; set; }
    [DataMember] 
    public string title { get; set; }    
    [DataMember]
    public string address { get; set; }
    [DataMember]
    public DateTime time { get; set; }
    [DataMember]
    public string note { get; set; }
    [DataMember]
    public string[] assignments { get; set; }


    public Meeting(string therapistId, string patientId, string title, string address, DateTime time, string note,
        string[] assignments)
        : base()
    {
        this.therapistId = therapistId;
        this.patientId = patientId;
        this.title = title;
        this.address = address;
        this.time = time;
        this.note = note;
        this.assignments = assignments;
    }

    public Meeting(Meeting meeting)
    {
        this._id = meeting._id;
        this.therapistId = meeting.therapistId;
        this.patientId = meeting.patientId;
        this.title = meeting.title;
        this.address = meeting.address;
        this.time = meeting.time;
        this.note = meeting.note;
        this.assignments = meeting.assignments;
    }
 
}