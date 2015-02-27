using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Runtime.Serialization;
using System.Web;

[DataContract]
public class Message : DatabaseObject
{
    [DataMember]
    public string clientId { get; set; }
    [DataMember]
    public string messageContent { get; set; }
    [DataMember]
    public string messageTime { get; set; }

    public Message(string clientId, string messageContent)
        : base()
    {
        this.clientId = clientId;
        this.messageContent = messageContent;
        this.messageTime = DateTime.Now.ToString();
    }

    public Message(Message message)
        : base()
    {
        this.clientId = message.clientId;
        this.messageContent = message.messageContent;
        this.messageTime = message.messageTime;
    }
}