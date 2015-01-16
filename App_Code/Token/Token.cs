using System;
using System.Net;
using System.Runtime.Serialization;
using System.ServiceModel.Web;

[DataContract]
public class Token
{
    [DataMember] public string _id { get; set; }
    [DataMember] public string exp { get; set; }
    [DataMember] public string _jti { get; set; }

    public Token(string id)
    {
        DateTime now = DateTime.UtcNow;

        _id = id;
        if (exp != null)
            exp = GetTimestamp(now.AddHours(12));
        _jti = Guid.NewGuid().ToString("N");
    }

    public Token(User user)
    {
        DateTime now = DateTime.UtcNow;

        _id = user._id;
        if (user.isRememberMe)
            exp = GetTimestamp(now.AddHours(12));
        else { exp = GetTimestamp(now.AddHours(12)); }
        _jti = Guid.NewGuid().ToString("N");
    }

    private static String GetTimestamp(DateTime value)
    {
        long ticks = value.Ticks - DateTime.Parse("01/01/1970 00:00:00").Ticks;
        ticks /= 10000000;
        return ticks.ToString();
    }
}