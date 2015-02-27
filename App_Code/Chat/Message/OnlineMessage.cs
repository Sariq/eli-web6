using System.Runtime.Serialization;

[DataContract]
public class OnlineMessage : Message
{
    public OnlineMessage(string clientId, string messageContent)
        : base(clientId, messageContent)
    {
    }
}