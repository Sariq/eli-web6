using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

[DataContract]
public class Project : DatabaseObject
{
    [DataMember] 
    public string name { get; set; }
    [DataMember]
    public List<Subject> subjects { get; set; }
   

    public Project(string name, List<Subject> subjects)
        : base()
    {       
        this.name = name;
        this.subjects = subjects;
    }

}