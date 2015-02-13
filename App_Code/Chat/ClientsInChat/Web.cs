using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Runtime.Serialization;
using System.Web;

[DataContract]
public class Web : Client
{
    public Web(string clientId)
        : base(clientId)
    { 
    }
}