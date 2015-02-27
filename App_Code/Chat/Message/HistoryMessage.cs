using System.Runtime.Serialization;

[DataContract]
public class HistoryMessage : Message
{
    public HistoryMessage(Message message)
        : base(message)
    {
    }
}