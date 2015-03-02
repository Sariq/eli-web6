using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;

[ServiceContract]
public interface IReminder
{
    [OperationContract]
    [WebInvoke(
         Method = "POST",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api")
    ]
    Reminder AddReminder(Reminder reminder);


    [OperationContract]
    [WebInvoke(
         Method = "DELETE",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api/{id}")
    ]
    void RemoveReminder(string id);


    [OperationContract]
    [WebInvoke(
         Method = "PUT",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api")
    ]
    void UpdateReminder(Reminder reminder);

    [OperationContract]
    [WebInvoke(
         Method = "POST",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "getReminderList")
    ]
    Reminder GetReminder(string id);

    [OperationContract]
    [WebInvoke(
         Method = "GET",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api")
    ]
    List<Reminder> GetAllReminders();

    [OperationContract]
    [WebInvoke(
         Method = "POST",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "GetRemindersByIds")
    ]
    List<Reminder> GetRemindersByIds(List<string> reminders);

    [OperationContract]
    [WebInvoke(
         Method = "POST",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "ApproveReminder/{id}")
    ]
    void ApproveReminder(string reminderId);

    


    //[OperationContract]
    //[WebInvoke(
    //     Method = "GET",
    //     ResponseFormat = WebMessageFormat.Json,
    //     BodyStyle = WebMessageBodyStyle.Bare,
    //     UriTemplate = "GetAllFutureReminders")
    //]
    //List<Reminder> GetAllFutureReminders();
}