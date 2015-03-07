using System.Collections.Generic;
using System.Diagnostics;

public class ChatMessageService : DatabaseActions, IChatMessage
{
    public void AddOnlineMessage(ChatMessage message)
    {
        InsertObjectNotAsync(message, "ChatMessage");
    }

    public void ChangeMessagesOfClientToHistory(string clientId)
    {
        UpdateObjects("clientId", clientId, "ChatMessage", "isHistory", true);
    }

    public List<ChatMessage> GetAllOnlineMessagesOfClient(string clientId)
    {
        Debug.Write(clientId);
        var onlineMessagesOfClientList = GetAllObject<ChatMessage>("clientId", clientId, "ChatMessage");

       // UpdateObjects("clientId", clientId, "Web", "isNewMessage", false);


        return onlineMessagesOfClientList;
    }

    //var clientService = new ClientService();
    //var web = clientService.GetWeb(clientId);
    //web.isNewMessage = false;
    //clientService.UpdateWeb(web);



    //public ChatMessage GetChatMessage(string messageId)
    //{
    //    return GetObject<ChatMessage>(messageId, "ChatMessage").Result;
    //}

    //public void AddHistoryMessage(Message message)
    //{
    //    InsertObjectNotAsync(message, "HistoryMessage");
    //}

    //public void RemoveHistoryMessage(Message message)
    //{
    //    RemoveObject(message._id, "HistoryMessage");
    //}



    //public List<ChatMessage> GetAllOnlineMessagesOfClient(string clientId)
    //{
    //    return GetAllObject<ChatMessage>("clientId", clientId, "ChatMessage");
    //}

    //public void SaveAllMessagesOfClient(string clientId)
    //{
    //    var allOnlineMessage = GetAllOnlineMessagesOfClient(clientId);

    //    foreach (Message message in allOnlineMessage)
    //    {
    //        AddHistoryMessage(message);
    //        RemoveOnlineMessage(message);
    //    }
    //}



}