using System.Collections.Generic;
using System.Runtime.Serialization;

[DataContract]
public class Subject
{
    [DataMember] 
    public string name { get; set; }
    [DataMember] 
    public List<SubjectData> subjectData { get; set; }

    public Subject(string name, List<SubjectData> subjectData)
    {
        this.name = name;
        this.subjectData = subjectData;
    }
 
}