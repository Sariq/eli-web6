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

    public Message(string clientId, string messageContent)
        : base()
    {
        this.clientId = clientId;
        this.messageContent = messageContent;
    }
}