using System.Collections.Generic;
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
    public string note { get; set; }
    [DataMember]
    public List<string> assignments { get; set; }


    public Meeting(string therapistId, string patientId, string title, string address, string note, List<string> assignments)
        : base()
    {
        this.therapistId = therapistId;
        this.patientId = patientId;
        this.title = title;
        this.address = address;
        this.note = note;
        this.assignments = assignments;
    }

    public Meeting(Meeting meeting)
        : base()
    {
        this._id = meeting._id;
        this._date = meeting._date;
        this.therapistId = meeting.therapistId;
        this.patientId = meeting.patientId;
        this.title = meeting.title;
        this.address = meeting.address;
        this.note = meeting.note;
        this.assignments = meeting.assignments;
    }
 
}



