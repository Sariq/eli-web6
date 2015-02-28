using System.Runtime.Serialization;

[DataContract]
public class SubjectData
{
    [DataMember] 
    public Assignment assignment { get; set; }
    [DataMember] 
    public string[] toUsers { get; set; }


    public SubjectData(Assignment assignment, string[] toUsers)
    {
        this.assignment = assignment;
        this.toUsers = toUsers;
    }
 
}