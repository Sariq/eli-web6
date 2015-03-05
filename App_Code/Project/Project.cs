using System.Collections.Generic;
using System.Runtime.Serialization;

[DataContract]
public class Project : DatabaseObject
{
    [DataMember] 
    public string userId { get; set; }
    [DataMember]
    public List<Item> items { get; set; }

    public Project(string userId, List<Item> items)
        : base()
    {
        this.userId = userId;
        this.items = items;
    }

    public Project(Project project)
    {
        this._id = project._id;
        this._date = project._date;
        this.userId = project.userId;
        this.items = project.items;
    }
 
}