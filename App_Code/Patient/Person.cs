using System.Runtime.Serialization;

public class Person
{
    [DataMember] 
    public string name { get; set; }
    [DataMember] 
    public string phoneNumber { get; set; }
    [DataMember]
    public string age { get; set; }
    [DataMember]
    public bool isContact { get; set; }

    public Person(string name, string phoneNumber, string age, bool isContact)
    {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.age = age;
        this.isContact = isContact;
    }
 
}