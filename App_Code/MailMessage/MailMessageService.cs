using System;
using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;


public class MailMessageService : DatabaseActions, IMailMessage
{
    public MailMessage SendMailMessage(MailMessage mailMessage)
    {
        var mailMessageId = InsertObjectAndReturnId(mailMessage, "MailMessage").Result;
        MailMessage dbMailMessage = GetMailMessage(mailMessageId);
        return dbMailMessage;
    }

    public void DeleteMailMessagesFromInbox(string[] mailMessagesId)
    {
        foreach (string mailMessageId in mailMessagesId)
        {
            MailMessage dbMailMessage = GetMailMessage(mailMessageId);
            dbMailMessage.isDelete = true;
            UpdateMailMessage(dbMailMessage);
        }
    }

    public void DeleteMailMessageFromTrash(string[] mailMessagesId)
    {
        foreach (string mailMessageId in mailMessagesId)
            RemoveObject(mailMessageId, "MailMessage");
    }

    public List<MailMessage> GetInboxMessages(string userId)
    {
        List<MailMessage> inboxMessages = new List<MailMessage>();
        foreach (MailMessage mailMessage in GetAllMessages())
        {
            if (mailMessage.toUser[0] == userId)
                inboxMessages.Add(mailMessage);
        }
        return inboxMessages;
    }

    public List<MailMessage> GetSentMessages(string userId)
    {
        List<MailMessage> sentMessages = new List<MailMessage>();
        foreach (MailMessage mailMessage in GetAllMessages())
        {
            if (mailMessage.fromUser[0] == userId)
                sentMessages.Add(mailMessage);
        }
        return sentMessages;
    }

    public List<MailMessage> GetDeleteMessages(string userId)
    {
        List<MailMessage> deleteMessages = new List<MailMessage>();
        foreach (MailMessage mailMessage in GetAllMessages())
        {
            if (mailMessage.isDelete)
                deleteMessages.Add(mailMessage);
        }
        return deleteMessages;
    }

    public void UpdateMailMessage(MailMessage mailMessage)
    {
        UpdateObject(mailMessage, "MailMessage");
    }

    public MailMessage GetMailMessage(string mailMessageId)
    {
        return GetObject<MailMessage>(mailMessageId, "MailMessage").Result;
    }

    public List<MailMessage> GetAllMessages()
    {
        return GetAllObject<MailMessage>("MailMessage");
    }

}