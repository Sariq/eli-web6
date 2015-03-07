using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;

[ServiceContract]
public interface IChatMessage
{
    [OperationContract]
    [WebInvoke(
         Method = "POST",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api")
    ]
    void AddOnlineMessage(ChatMessage message);

    [OperationContract]
    [WebInvoke(
         Method = "POST",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "AddHistoryMessage")
    ]
    void ChangeMessagesOfClientToHistory(string id);

    [OperationContract]
    [WebInvoke(
         Method = "POST",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "GetAllOnlineMessagesOfClient")
    ]
    List<ChatMessage> GetAllOnlineMessagesOfClient(string id);

    //    [OperationContract]
    //[WebInvoke(
    //     Method = "POST",
    //     ResponseFormat = WebMessageFormat.Json,
    //     BodyStyle = WebMessageBodyStyle.Bare,
    //     UriTemplate = "GetAllHistoryMessagesOfClient")
    //]
    //List<ChatMessage> GetAllHistoryMessagesOfClient(string id);

    //[OperationContract]
    //[WebInvoke(
    //     Method = "POST",
    //     ResponseFormat = WebMessageFormat.Json,
    //     BodyStyle = WebMessageBodyStyle.Bare,
    //     UriTemplate = "SaveAllMessagesOfClient")
    //]
    //void SaveAllMessagesOfClient(string id);

}