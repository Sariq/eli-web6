using System.Collections.Generic;

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