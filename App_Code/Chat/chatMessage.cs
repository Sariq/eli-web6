using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class ChatMessage
{

    public string clientName;
    public string clientId;
    public string arrType;
    public List<Message> allMessage;

    public ChatMessage(string clientId, List<Message> allMessage)
	{
        this.allMessage = allMessage;
        this.clientName = new ClientService().GetWeb(clientId).webName;
        this.arrType = "messagesArr";
        this.clientId = new ClientService().GetWeb(clientId).clientId;
	}
}