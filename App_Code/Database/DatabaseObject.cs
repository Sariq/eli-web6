using MongoDB.Bson;
using System;
using System.Runtime.Serialization;

[DataContract]
public class DatabaseObject
{
    [DataMember]
    public string _id { get; set; }
    [DataMember]
    public DateTime _date { get; set; }

    public DatabaseObject()
    {
        _id = Convert.ToString((ObjectId.GenerateNewId()));
        _date = DateTime.UtcNow;
    }
}