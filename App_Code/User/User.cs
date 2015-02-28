using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

[DataContract]
public class User : DatabaseObject
{
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
    public List<string> assignments { get; set; }

    public User(string userId, string password, string name, string email, string address, string birthDate,
        string role, bool isRememberMe, List<string> assignment)
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
        this.assignments = assignments;
    }

    public User(string userId, string password)
        : base()
    {
        this.userId = userId;
        this.password = password;
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
        this.assignments = user.assignments;
    }
 
}