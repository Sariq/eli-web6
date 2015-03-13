using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

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
    [DataMember]
    public List<string> meetings { get; set; }
    [DataMember]
    public bool isDelete { get; set; }


    public Patient (string identityNumber, string name, string email, string address, DateTime birthDate, string education, string workplace,
        List<Person> contacts, List<string> meetings)
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
        this.meetings = meetings;
        this.isDelete = false;
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
        this.meetings = patient.meetings;
        this.isDelete = patient.isDelete;
    }
 
}