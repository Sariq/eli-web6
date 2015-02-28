using System.Collections.Generic;
using System.Runtime.Serialization;

[DataContract]
public class SubjectData
{
    [DataMember] 
    public string assignmentId { get; set; }
    [DataMember]
    public List<string> toUsers { get; set; }


    public SubjectData(string assignmentId, List<string> toUsers)
    {
        this.assignmentId = assignmentId;
        this.toUsers = toUsers;
    }
 
}