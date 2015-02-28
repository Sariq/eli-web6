using System;
using System.Runtime.Serialization;

[DataContract]
public class Project : DatabaseObject
{
    [DataMember] 
    public string name { get; set; }
    [DataMember]
    public Subject[] subjects { get; set; }
   

    public Project(string name, Subject[] subjects)
        : base()
    {       
        this.name = name;
        this.subjects = subjects;
    }

}