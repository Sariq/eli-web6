using System;
using System.Runtime.Serialization;

[DataContract]
public class Reminder : DatabaseObject
{
    [DataMember] 
    public DateTime reminderTime { get; set; }
    [DataMember] 
    public string dataId { get; set; }
    [DataMember]
    public string dataType { get; set; }
    [DataMember]
    public string title { get; set; }
     [DataMember]
    public bool isApproved { get; set; }


    public Reminder(DateTime reminderTime, string dataId, string dataType, string title)
        : base()
    {       
        this.reminderTime = reminderTime;
        this.dataId = dataId;
        this.dataType = dataType;
        this.title = title;
        this.isApproved = false;
    }

    public Reminder(Reminder reminder)
        : base()
    {
        this._id = reminder._id;
        this._date = reminder._date;
        this.reminderTime = reminder.reminderTime;
        this.dataId = reminder.dataId;
        this.dataType = reminder.dataType;
        this.title = reminder.title;
        this.isApproved = reminder.isApproved;
    }

}