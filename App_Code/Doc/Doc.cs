using System;
using System.Runtime.Serialization;

[DataContract]
public class Doc : DatabaseObject
{
    [DataMember] 
    public string docName { get; set; }


    public Doc(string DocName)
        : base()
    {
        this.docName = DocName;
    }

    public Doc(Doc doc)
    {
        this._id = doc._id;
        this.docName = doc.docName;
    }
 
}