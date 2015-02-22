using System;
using System.Runtime.Serialization;

[DataContract]
public class News : DatabaseObject
{
    [DataMember] 
    public string title { get; set; }
    [DataMember]
    public string content { get; set; }
    [DataMember]
    public DateTime time { get; set; }
    

    public News(string title, string content)
        : base()
    {       
        this.title = title;
        this.content = content;
        this.time = DateTime.Today;
    }

    public News(News news)
        : base()
    {
        this._id = news._id;
        this.title = news.title;
        this.content = news.content;
        this.time = news.time;
    }

}