using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class websData
{


    public List<Web> allwebs;
    public string arrType;
    public websData(List<Web> allwebs)
    {
        this.allwebs = allwebs;
        this.arrType = "websArr";


    }
}