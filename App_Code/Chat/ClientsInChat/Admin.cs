using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Runtime.Serialization;
using System.Web;

[DataContract]
public class Admin : Client
{
    public Admin(string clientId)
        : base(clientId, 0)
    { 
    }
}