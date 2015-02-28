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
   

    public Reminder(DateTime reminderTime, string dataId, string dataType)
        : base()
    {       
        this.reminderTime = reminderTime;
        this.dataId = dataId;
        this.dataType = dataType;
    }

    public Reminder(Reminder reminder)
        : base()
    {
        this._id = reminder._id;
        this._date = reminder._date;
        this.reminderTime = reminder.reminderTime;
        this.dataId = reminder.dataId;
        this.dataType = reminder.dataType;
    }

}