using System.Runtime.Serialization;

[DataContract]
public class Contact : DatabaseObject
{
    [DataMember] 
    public string name { get; set; }
    [DataMember]
    public string email { get; set; }
    [DataMember]
    public string subject { get; set; }
    [DataMember]
    public string message { get; set; }

    public Contact(string name, string email, string subject, string message)
        : base()
    {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
    }

    public Contact(Contact contact)
        : base()
    {
        this._id = contact._id;
        this.name = contact.name;
        this.email = contact.email;
        this.subject = contact.subject;
        this.message = contact.message;
    }

}