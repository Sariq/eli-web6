using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Runtime.Serialization;
using System.Web;

[DataContract]
public class ChatMessage : DatabaseObject
{
    [DataMember]
    public string clientId { get; set; }
    [DataMember]
    public string messageContent { get; set; }
    [DataMember]
    public string type { get; set; }
    [DataMember]
    public bool isHistory { get; set; }

    public ChatMessage(string clientId, string messageContent, string type)
        : base()
    {
        this.clientId = clientId;
        this.messageContent = messageContent;
        this.type = type;
        this.isHistory = false;
    }

    public ChatMessage(ChatMessage message)
        : base()
    {
        this._id = message._id;
        this._date = message._date;
        this.clientId = message.clientId;
        this.messageContent = message.messageContent;
        this.type = message.type;
        this.isHistory = message.isHistory;
    }
}