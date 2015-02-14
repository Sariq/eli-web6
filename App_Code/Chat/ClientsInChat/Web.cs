using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Runtime.Serialization;
using System.Web;

[DataContract]
public class Web : Client
{
    [DataMember]
    public string webName { get; set; }

    public Web(string clientId, int chatWebCounter)
        : base(clientId, chatWebCounter)
    {
        webName = "User" + chatWebCounter;
    }
}