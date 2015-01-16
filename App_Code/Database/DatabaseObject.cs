using MongoDB.Bson;
using System;
using System.Runtime.Serialization;

[DataContract]
public class DatabaseObject
{
    [DataMember]
    public string _id { get; set; }

    public DatabaseObject()
    {
        _id = Convert.ToString((ObjectId.GenerateNewId()));
    }
}