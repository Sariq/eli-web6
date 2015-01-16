using System;
using System.Runtime.Serialization;

[DataContract]
public class Patient : DatabaseObject
{
    [DataMember] 
    public string identity_number { get; set; }
    [DataMember] 
    public string first_name { get; set; }
    [DataMember]
    public string last_name { get; set; }
    [DataMember]
    public string email { get; set; }
    [DataMember]
    public string address { get; set; }
    [DataMember] 
    public DateTime birth_date { get; set; }
    [DataMember]
    public string[] assignments { get; set; }

    public Patient(string identityNumber, string firstName, string lastName, string email, string address,
        DateTime birthDate, string[] assignments)
        : base()
    {
        this.identity_number = identityNumber;
        this.first_name = firstName;
        this.last_name = lastName;
        this.email = email;
        this.address = address;
        this.birth_date = birthDate;
        this.assignments = assignments;
    }

    public Patient(string identityNumber, string firstName, string lastName)
        : base()
    {
        this.identity_number = identityNumber;
        this.first_name = firstName;
        this.last_name = lastName;
    }

    public Patient(Patient patient)
    {
        _id = patient._id;
        this.identity_number = patient.identity_number;
        this.first_name = patient.first_name;
        this.last_name = patient.last_name;
        this.email = patient.email;
        this.address = patient.address;
        this.birth_date = patient.birth_date;
        this.assignments = patient.assignments;
    }
 
}