using System.Runtime.Serialization;

[DataContract]
public class Assignment : DatabaseObject
{
    [DataMember] 
    public string title { get; set; }
    [DataMember]
    public string content { get; set; }
    [DataMember]
    public bool isDone { get; set; }
    

    public Assignment(string title, string content, bool isDone)
        : base()
    {
        
        this.title = title;
        this.content = content;
        this.isDone = isDone;
    }

    public Assignment(Assignment assignment)
        : base()
    {
        this._id = assignment._id;
        this.title = assignment.title;
        this.content = assignment.content;
        this.isDone = assignment.isDone;
    }

}