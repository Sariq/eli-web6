using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;

[ServiceContract]
public interface IDoc
{
    //[OperationContract]
    //[WebInvoke(
    //     Method = "POST",
    //     ResponseFormat = WebMessageFormat.Json,
    //     BodyStyle = WebMessageBodyStyle.Bare,
    //     UriTemplate = "api")
    //]
    //void AddDoc(Doc doc);

    //[OperationContract]
    //[WebInvoke(
    //     Method = "DELETE",
    //     ResponseFormat = WebMessageFormat.Json,
    //     BodyStyle = WebMessageBodyStyle.Bare,
    //     UriTemplate = "api/{id}")
    //]
    //void RemoveDoc(string id);

    //[OperationContract]
    //[WebInvoke(
    //     Method = "PUT",
    //     ResponseFormat = WebMessageFormat.Json,
    //     BodyStyle = WebMessageBodyStyle.Bare,
    //     UriTemplate = "api")
    //]
    //void UpdateDoc(Doc doc);

    //[OperationContract]
    //[WebInvoke(
    //     Method = "GET",
    //     ResponseFormat = WebMessageFormat.Json,
    //     BodyStyle = WebMessageBodyStyle.Bare,
    //     UriTemplate = "api/{id}")
    //]
    //Patient GetDoc(string id);

    //[OperationContract]
    //[WebInvoke(
    //     Method = "GET",
    //     ResponseFormat = WebMessageFormat.Json,
    //     BodyStyle = WebMessageBodyStyle.Bare,
    //     UriTemplate = "api")
    //]
    //List<Doc> GetAllDocs();

}