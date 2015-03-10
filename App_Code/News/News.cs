using System.Runtime.Serialization;

[DataContract]
public class News : DatabaseObject
{
    [DataMember] 
    public string title { get; set; }
    [DataMember]
    public string content { get; set; }
   

    public News(string title, string content)
        : base()
    {       
        this.title = title;
        this.content = content;
    }

    public News(News news)
        : base()
    {
        this._id = news._id;
        this._date = news._date;
        this.title = news.title;
        this.content = news.content;
    }

}