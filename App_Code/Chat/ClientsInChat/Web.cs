using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Runtime.Serialization;
using System.Web;

[DataContract]
public class Web : Client
{
    [DataMember]
    public string webName { get; set; }
    [DataMember]
    public bool isNewMessage { get; set; }
    [DataMember]
    public bool isOnline { get; set; }

    public Web(string clientId, int chatWebCounter)
        : base(clientId)
    {
        webName = "User" + chatWebCounter;
        isNewMessage = false;
        isOnline = true;
    }
}