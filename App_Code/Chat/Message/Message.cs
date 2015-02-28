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
    public string type { get; set; }

    public Message(string clientId, string messageContent, string type)
        : base()
    {
        this.clientId = clientId;
        this.messageContent = messageContent;
        this.type = type;
    }

    public Message(Message message)
        : base()
    {
        this._id = message._id;
        this._date = message._date;
        this.clientId = message.clientId;
        this.messageContent = message.messageContent;
        this.type = message.type;
    }
}