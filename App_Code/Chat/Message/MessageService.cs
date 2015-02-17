using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;
using System;
using MongoDB.Driver;
using System.Diagnostics;

public class MessageService : DatabaseActions, IMessage
{

    public void AddOnlineMessage(Message message)
    {
        InsertObjectNotAsync(message, "OnlineMessage");
    }

    public void RemoveOnlineMessage(Message message)
    {
        RemoveObject(message._id, "OnlineMessage");
    }

    public void AddHistoryMessage(Message message)
    {
        InsertObjectNotAsync(message, "HistoryMessage");
    }

    public void RemoveHistoryMessage(Message message)
    {
        RemoveObject(message._id, "HistoryMessage");
    }

    public List<Message> GetAllOnlineMessages()
    {
        return GetAllObject<Message>("OnlineMessage");
    }

    public List<Message> GetAllHistoryMessages()
    {
        return GetAllObject<Message>("HistoryMessage");
    }

    public List<Message> GetAllOnlineMessagesOfClient(string clientId)
    {
<<<<<<< HEAD
        var onlineMessagesOfClientList = new List<Message>();
        var allOnlineMessage = GetAllOnlineMessages();
=======
        Debug.Write(clientId);
        List<Message> messagesOfClientList = new List<Message>();
>>>>>>> 8f71c8d364ebbed3f919c3d0178079892f4a1acb

        foreach (Message message in allOnlineMessage)
        {
            if (message.clientId == clientId)
                onlineMessagesOfClientList.Add(message);
        }

        return onlineMessagesOfClientList;
    }

    public List<Message> GetAllHistoryMessagesOfClient(string clientId)
    {
        var historyMessagesOfClientList = new List<Message>();
        var allMessage = GetAllHistoryMessages();

        foreach (Message message in allMessage)
        {
            if (message.clientId == clientId)
                historyMessagesOfClientList.Add(message);
        }

        return historyMessagesOfClientList;
    }

    public void SaveAllMessagesOfClient(string clientId)
    {
        var allOnlineMessage = GetAllOnlineMessagesOfClient(clientId);

        foreach (Message message in allOnlineMessage)
        {
            AddHistoryMessage(message);
            RemoveOnlineMessage(message);
        }
    }
  
}