using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;
using System;
using MongoDB.Driver;
using System.Diagnostics;

public class MessageService : DatabaseActions, IMessage
{

    public void AddMessage(Message message)
    {
        InsertObjectNotAsync(message, "Message");
    }

    //public List<Message> GetAllMessages()
    //{
    //    return GetAllObject<Message>("Message");
    //}

    public List<Message> GetAllMessages(string clientId)
    {
        Debug.Write(clientId);
        List<Message> messagesOfClientList = new List<Message>();

        foreach (Message message in GetAllObject<Message>("Message"))
        {
            if (message.clientId == clientId)
                messagesOfClientList.Add(message);
        }

        return messagesOfClientList;
    }


   
}