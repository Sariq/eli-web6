using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Runtime.Serialization;
using System.Web;

[DataContract]
public class Client : DatabaseObject
{
    [DataMember]
    public string clientId { get; set; }

    public Client(string clientId)
        : base()
    {
        this.clientId = clientId;
    }
}