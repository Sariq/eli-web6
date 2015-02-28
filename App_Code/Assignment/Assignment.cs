using System;
using System.Runtime.Serialization;

[DataContract]
public class Assignment : DatabaseObject
{
    [DataMember]
    public string userId { get; set; }
    [DataMember] 
    public string title { get; set; }
    [DataMember]
    public string content { get; set; }
    [DataMember]
    public bool isDone { get; set; }

    public Assignment(string userId, string title, string content, bool isDone)
        : base()
    {
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.isDone = isDone;
    }

    public Assignment(Assignment assignment)
        : base()
    {
        this._id = assignment._id;
        this._date = assignment._date;
        this.userId = assignment.userId;
        this.title = assignment.title;
        this.content = assignment.content;
        this.isDone = assignment.isDone;
    }

}