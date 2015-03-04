using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

[DataContract]
public class Project : DatabaseObject
{

    public string text { get; set; }

    public string pid { get; set; }
 
    public string id { get; set; }
   
    public List<Project> items { get; set; }


    public Project(List<Project> items)
        : base()
    {

        this.items = items;
    }

}



//using System;
//using System.Collections.Generic;
//using System.Runtime.Serialization;

//[DataContract]
//public class Project : DatabaseObject
//{
//    [DataMember] 
//    public string name { get; set; }
//    [DataMember]
//    public List<Subject> subjects { get; set; }
   

//    public Project(string name, List<Subject> subjects)
//        : base()
//    {       
//        this.name = name;
//        this.subjects = subjects;
//    }

//}
