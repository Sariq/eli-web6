using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;

[ServiceContract]
public interface IMeeting
{
    [OperationContract]
    [WebInvoke(
         Method = "POST",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api")
    ]
    void AddMeeting(Meeting meeting);

    [OperationContract]
    [WebInvoke(
         Method = "DELETE",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api/{id}")
    ]
    void RemoveMeeting(string id);

    [OperationContract]
    [WebInvoke(
         Method = "PUT",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api")
    ]
    void UpdateMeeting(Meeting meeting);

    [OperationContract]
    [WebInvoke(
         Method = "GET",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api/{id}")
    ]
    Meeting GetMeeting(string id);

    [OperationContract]
    [WebInvoke(
         Method = "GET",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api")
    ]
    List<Meeting> GetAllMeetings();

    [OperationContract]
    [WebInvoke(
         Method = "POST",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api/{id}")
    ]
    List<Assignment> GetAllAssignmentsOfMeeting(string id);

}