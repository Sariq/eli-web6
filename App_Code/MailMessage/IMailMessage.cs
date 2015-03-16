using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;

[ServiceContract]
public interface IMailMessage
{
    [OperationContract]
    [WebInvoke(
         Method = "POST",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api")
    ]
    MailMessage SendMailMessage(MailMessage mailMessage);

    [OperationContract]
    [WebInvoke(
         Method = "POST",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "UpdateMailMessage")
    ]
    void UpdateMailMessage(MailMessage mailMessage);
  

    [OperationContract]
    [WebInvoke(
         Method = "POST",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "UpdateMailMessages")
    ]
    void UpdateMailMessages(List<MailMessage> mailMessages);

    [OperationContract]
    [WebInvoke(
         Method = "POST",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "DeleteMailMessagesFromInbox")
    ]
    void DeleteMailMessagesFromInbox(string[] mailMessagesId);

    [OperationContract]
    [WebInvoke(
         Method = "DELETE",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "DeleteMailMessageFromTrash")
    ]
    void DeleteMailMessageFromTrash(string[] mailMessagesId);

    //[OperationContract]
    //[WebInvoke(
    //     Method = "POST",
    //     ResponseFormat = WebMessageFormat.Json,
    //     BodyStyle = WebMessageBodyStyle.Bare,
    //     UriTemplate = "GetInboxMessages")
    //]
    //List<MailMessage> GetInboxMessages(string id);

    [OperationContract]
    [WebInvoke(
         Method = "POST",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api/GetInboxMessages")
    ]
    List<MailMessage> GetInboxMessages(string id);

    [OperationContract]
    [WebInvoke(
         Method = "GET",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "GetSentMessages/{id}")
    ]
    List<MailMessage> GetSentMessages(string id);

    [OperationContract]
    [WebInvoke(
         Method = "GET",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "GetDeleteMessages")
    ]
    List<MailMessage> GetDeleteMessages();
}