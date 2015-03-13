using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;

[ServiceContract]
public interface IRole
{
    [OperationContract]
    [WebInvoke(
         Method = "POST",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api")
    ]
    Role AddRole(Role role);


    [OperationContract]
    [WebInvoke(
         Method = "DELETE",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api/{id}")
    ]
    void RemoveRole(string id);

    [OperationContract]
    [WebInvoke(
         Method = "PUT",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api")
    ]
    void UpdateRole(Role role);

    [OperationContract]
    [WebInvoke(
         Method = "GET",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api/{id}")
    ]
    Role GetRole(string id);

    [OperationContract]
    [WebInvoke(
         Method = "GET",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "api")
    ]
    List<Role> GetAllRoles();
}