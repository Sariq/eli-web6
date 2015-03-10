﻿using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

[DataContract]
public class User : DatabaseObject
{
    private string p1;
    private string p2;
    private string p3;
    private string p4;
    private string p5;
    private string p6;
    private string p7;
    private bool isRememberMe1;
    private List<string> list1;
    private List<string> list2;
    private List<string> list3;
    private List<string> list4;

    [DataMember]
    public string userId { get; set; }
    [DataMember]
    public string password { get; set; }
    [DataMember]
    public string name { get; set; }
    [DataMember]
    public string email { get; set; }
    [DataMember]
    public string address { get; set; }
    [DataMember]
    public string birthDate { get; set; }
    [DataMember]
    public string role { get; set; }
    [DataMember]
    public Boolean isRememberMe { get; set; }
    [DataMember]
    public List<string> projectAassignments { get; set; }
    [DataMember]
    public List<string> projects { get; set; }
    [DataMember]
    public List<string> reminders { get; set; }
    [DataMember]
    public List<string> patients { get; set; }

    public User(string userId, string password, string name, string email, string address, string birthDate,
        string role, bool isRememberMe, List<string> reminders, List<string> projectAassignments, List<string> projects,List<string> patients)
        : base()
    {
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.email = email;
        this.address = address;
        this.birthDate = birthDate;
        this.role = role;
        this.isRememberMe = isRememberMe;
        this.reminders = reminders;
        this.projectAassignments =projectAassignments;
        this.projects = projects;
        this.patients = patients;
    }

    public User(User user)
    {
        this._id = user._id;
        this._date = user._date;
        this.userId = user.userId;
        this.password = user.password;
        this.name = user.name;
        this.email = user.email;
        this.address = user.address;
        this.birthDate = user.birthDate;
        this.role = user.role;
        this.isRememberMe = user.isRememberMe;
        this.projectAassignments = user.projectAassignments;
        this.reminders = user.reminders;
        this.patients = user.patients;
    }
 
}