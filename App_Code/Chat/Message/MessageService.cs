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

    public List<Message> GetAllOnlineMessagesOfClient(string clientId)
    {


        //var clientService = new ClientService();

        //var web = clientService.GetWeb(clientId);
        //web.isNewMessage = true;
        //clientService.UpdateWeb(web);

        //var onlineMessagesOfClientList = new List<Message>();
        //var allOnlineMessage = GetAllOnlineMessages();

        //List<Message> messagesOfClientList = new List<Message>();

        //foreach (Message message in allOnlineMessage)
        //{
        //    if (message.clientId == clientId)
        //        onlineMessagesOfClientList.Add(message);
        //}

       

        var onlineMessagesOfClientList = GetAllObject<Message>("clientId", clientId, "OnlineMessage");

        var clientService = new ClientService();
        var web = clientService.GetWeb(clientId);
        web.isNewMessage = false;
        clientService.UpdateWeb(web);


        return onlineMessagesOfClientList;
    }

    public List<Message> GetAllHistoryMessagesOfClient(string clientId)
    {
        return GetAllObject<Message>("clientId", clientId, "HistoryMessage");
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