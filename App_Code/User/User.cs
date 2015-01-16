using System;
using System.Runtime.Serialization;

[DataContract]
public class User : DatabaseObject
{
    [DataMember]
    public string userId { get; set; }
    [DataMember]
    public string password { get; set; }
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
    public string role { get; set; }
    [DataMember]
    public Boolean isRememberMe { get; set; }


    public User(string userId, string password, string firstName, string lastName, string email, string address, 
        DateTime birth_date, string role, bool isRememberMe)
        : base()
    {
        this.userId = userId;
        this.password = password;
        this.first_name = firstName;
        this.last_name = lastName;
        this.email = email;
        this.address = address;
        this.birth_date = birth_date;
        this.role = role;
        this.isRememberMe = isRememberMe;
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
        this.userId = user.userId;
        this.password = user.password;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.address = user.address;
        this.birth_date = user.birth_date;
        this.role = user.role;
        this.isRememberMe = user.isRememberMe;
    }
 
}