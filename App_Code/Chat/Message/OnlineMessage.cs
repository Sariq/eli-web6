using System.Runtime.Serialization;

[DataContract]
public class OnlineMessage : Message
{
    public OnlineMessage(string clientId, string messageContent, string type)
        : base(clientId, messageContent, type)
    {
    }
}