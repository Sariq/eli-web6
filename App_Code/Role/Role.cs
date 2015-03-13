using System.Runtime.Serialization;

[DataContract]
public class Role : DatabaseObject
{
    public enum RoleType
    {
        Director,
        Therapist,
        Secretary
    }

    [DataMember] 
    public string role { get; set; }


    public Role(string role)
        : base()
    {
        this.role = role;
    }

    public Role(RoleType role)
        : base()
    {
        this.role = role.ToString();
    }

}