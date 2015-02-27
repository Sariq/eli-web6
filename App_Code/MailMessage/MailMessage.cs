using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

[DataContract]
public class MailMessage : DatabaseObject
{
    [DataMember]
    public List<string> fromUser { get; set; }
    [DataMember]
    public List<string> toUser { get; set; }
    [DataMember] 
    public string subject { get; set; }    
    [DataMember]
    public string content { get; set; }
    
    public DateTime time { get; set; }
    [DataMember]
    public bool isRead { get; set; }
    [DataMember]
    public bool isStar { get; set; }
    [DataMember]
    public bool isDelete { get; set; }


    public MailMessage(List<string> fromUser, List<string> toUser, string subject, string content, bool isRead, 
        bool isStar, bool isDelete)
        : base()
    {
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.subject = subject;
        this.content = content;
        this.isRead = isRead;
        this.isStar = isStar;
        this.isDelete = isDelete;
        this.time = DateTime.Today;
    }

    public MailMessage(MailMessage mailMessage)
        : base()
    {
        this.fromUser = mailMessage.fromUser;
        this.toUser = mailMessage.toUser;
        this.subject = mailMessage.subject;
        this.content = mailMessage.content;
        this.time = mailMessage.time;
        this.isRead = mailMessage.isRead;
        this.isStar = mailMessage.isStar;
        this.isDelete = mailMessage.isDelete;
    }
 
}



