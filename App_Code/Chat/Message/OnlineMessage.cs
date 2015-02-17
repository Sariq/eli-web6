using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Runtime.Serialization;
using System.Web;

[DataContract]
public class OnlineMessage : Message
{

    public OnlineMessage(string clientId, string messageContent)
        : base(clientId, messageContent)
    {
    }
}