using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class ChatMessage
{

    public string clientName;
    public List<Message> allMessage;

    public ChatMessage(string clientId, List<Message> allMessage)
	{
        
        this.allMessage = allMessage;
        this.clientName = new ClientService().GetWeb(clientId).webName;
	}
}