using System.Collections.Generic;
using System.Runtime.Serialization;

[DataContract]
public class Project : DatabaseObject
{
    [DataMember]
    public List<Item> items { get; set; }
    [DataMember]
    public string name { get; set; }
    public Project(List<Item> items,string name)
        : base()
    {
        this.items = items;
        this.name = name;
    }

    public Project(Project project)
    {
        this._id = project._id;
        this._date = project._date;
        this.items = project.items;
        this.name = project.name;
    }
 
}