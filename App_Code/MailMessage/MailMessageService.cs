﻿using System.Collections.Generic;
using System.Runtime.Serialization;

[DataContract]
public class MailMessageService : DatabaseActions, IMailMessage
{
    public MailMessage SendMailMessage(MailMessage mailMessage)
    {
        var mailMessageId = InsertObjectAndReturnId(mailMessage, "MailMessage").Result;
        MailMessage dbMailMessage = GetMailMessage(mailMessageId);
        return dbMailMessage;
    }

    public void UpdateMailMessages(List<MailMessage> mailMessages)
    {
        foreach (MailMessage message in mailMessages)
            UpdateMailMessage(message);
    }

    public void UpdateMailMessage(MailMessage mailMessage)
    {
        UpdateObject(mailMessage, "MailMessage");
    }

    public void DeleteMailMessageFromTrash(string[] mailMessagesId)
    {
        foreach (string mailMessageId in mailMessagesId)
            RemoveObject(mailMessageId, "MailMessage");
    }

    public void DeleteMailMessagesFromInbox(string[] mailMessagesId)
    {
        foreach (string mailMessageId in mailMessagesId)
        {
            //MailMessage dbMailMessage = GetMailMessage(mailMessageId);
            //dbMailMessage.isDelete = true;
            //UpdateMailMessage(dbMailMessage);
            UpdateObjects("_id", mailMessageId, "MailMessage", "isDelete", true);

        }
    }

    public List<MailMessage> GetInboxMessages(string userId)
    {
        return GetAllObject<MailMessage>("toUser", userId, "MailMessage");
    }

    public List<MailMessage> GetSentMessages(string userId)
    {
        return GetAllObject<MailMessage>("fromUser[0]", userId, "MailMessage");
    }

    public List<MailMessage> GetDeleteMessages()
    {
        return GetAllObject<MailMessage>("isDelete", true, "MailMessage");
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