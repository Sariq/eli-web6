using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Runtime.Serialization;
using System.Web;

[DataContract]
public class HistoryMessage : Message
{
    public HistoryMessage(Message message)
        : base(message.clientId, message.messageContent)
    {
    }
}