using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;
using System;
using MongoDB.Driver;

public class MessageService : DatabaseActions
{

    public void AddMessage(Message message)
    {
        InsertObject(message, "Message");
    }

    public List<Message> GetAllMessages()
    {
        return GetAllObject<Message>("Message");
    }

    public List<Message> GetAllMessages(string clientId)
    {
        List<Message> messagesOfClientList = new List<Message>();

        foreach (Message message in GetAllMessages())
        {
            if (message.clientId == clientId)
                messagesOfClientList.Add(message);
        }

        return messagesOfClientList;
    }

}