using System;
using System.Runtime.Serialization;

[DataContract]
public class Report : DatabaseObject
{
    [DataMember] 
    public string title { get; set; }
    [DataMember]
    public string content { get; set; }
    [DataMember]
    public string chatId { get; set; }
    [DataMember]
    public string adminId { get; set; }


    public Report(string title, string content, string chatId, string adminId)
        : base()
    {
        this.title = title;
        this.content = content;
        this.chatId = chatId;
        this.adminId = adminId;
    }

    public Report(Report report)
        : base()
    {
        this._id = report._id;
        this._date = report._date;
        this.title = report.title;
        this.content = report.content;
        this.chatId = report.chatId;
        this.adminId = report.adminId;
    }

}