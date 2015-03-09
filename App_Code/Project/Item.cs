using System.Collections.Generic;
using System.Runtime.Serialization;

[DataContract]
public class Item
{
    [DataMember] 
    public string text { get; set; }
    [DataMember] 
    public string pId { get; set; }
    [DataMember]
    public string id { get; set; }
    [DataMember]
    public List<string> idOfAssignments { get; set; }
    [DataMember]
    public List<Item> items { get; set; }

    public Item(string text, string pId, string id, List<Item> items)
    {
        this.text = text;
        this.pId = pId;
        this.id = id;
        this.idOfAssignments = new List<string> { };
        this.items = items;
    }

    public Item(Item item)
    {
        this.text = item.text;
        this.pId = item.pId;
        this.id = item.id;
        this.idOfAssignments = item.idOfAssignments;
        this.items = item.items;
    }
 
}