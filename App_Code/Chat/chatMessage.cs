using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class ChatMessageArr
{
    public string clientName;
    public string clientId;
    public string arrType;
    public List<ChatMessage> allMessage;

    public ChatMessageArr(string clientId, List<ChatMessage> allMessage)
	{
        this.allMessage = allMessage;
        this.clientName = new ClientService().GetWeb(clientId).webName;
        this.arrType = "messagesArr";
        this.clientId = new ClientService().GetWeb(clientId).clientId;
	}
}