using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;

[ServiceContract]
public interface IUser
{
    [OperationContract]
    [WebInvoke(
        Method = "POST",
        ResponseFormat = WebMessageFormat.Json,
        BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "SignIn")
    ]
    User SignIn(User user);

    [OperationContract]
    [WebInvoke(
        Method = "POST",
        ResponseFormat = WebMessageFormat.Json,
        BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "SignOut")
    ]
    void SignOut();

    [OperationContract]
    [WebInvoke(
         Method = "GET",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "GetUser/{id}")
    ]
    User GetUser(string id);

    [OperationContract]
    [WebInvoke(
         Method = "POST",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "AddUser")
    ]
    void AddUser(User user);

    [OperationContract]
    [WebInvoke(
         Method = "DELETE",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "RemoveUser")
    ]
    void RemoveUser(string userId);

    [OperationContract]
    [WebInvoke(
         Method = "PUT",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "UpdateUser")
    ]
    void UpdateUser(User user);

    [OperationContract]
    [WebInvoke(
         Method = "GET",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "GetAllUsers")
    ]
    List<User> GetAllUsers();
}