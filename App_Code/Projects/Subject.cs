using System.Runtime.Serialization;

[DataContract]
public class Subject
{
    [DataMember] 
    public string name { get; set; }
    [DataMember] 
    public SubjectData[] subjectData { get; set; }

    public Subject(string name, SubjectData[] subjectData)
    {
        this.name = name;
        this.subjectData = subjectData;
    }
 
}