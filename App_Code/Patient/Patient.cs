using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Web;

[DataContract]
public class Patient : DatabaseObject
{
    [DataMember] 
    public string identityNumber { get; set; }
    [DataMember] 
    public string name { get; set; }
    [DataMember]
    public string email { get; set; }
    [DataMember]
    public string address { get; set; }
    [DataMember]
    public DateTime birthDate { get; set; }
    [DataMember]
    public string education { get; set; }
    [DataMember]
    public string workplace { get; set; }
    [DataMember]
    public List<Person> contacts { get; set; }

    public Patient(string identityNumber, string name, string email, string address, DateTime birthDate,
        string education, string workplace, List<Person> contacts)
        : base()
    {
        this.identityNumber = identityNumber;
        this.name = name;
        this.email = email;
        this.address = address;
        this.birthDate = birthDate;
        this.education = education;
        this.workplace = workplace;
        this.contacts = contacts;
    }

    public Patient(Patient patient)
    {
        this._id = patient._id;
        this._date = patient._date;
        this.identityNumber = patient.identityNumber;
        this.name = patient.name;
        this.email = patient.email;
        this.address = patient.address;
        this.birthDate = patient.birthDate;
        this.education = patient.education;
        this.workplace = patient.workplace;
        this.contacts = patient.contacts;
    }
 
}