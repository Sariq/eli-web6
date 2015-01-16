using System.ServiceModel;
using System.ServiceModel.Web;

[ServiceContract]
public interface IDatabaseService
{
    [OperationContract]
    [WebInvoke(
        Method = "POST",
        ResponseFormat = WebMessageFormat.Json,
        BodyStyle = WebMessageBodyStyle.Bare,
        UriTemplate = "Initialize")
    ]
    void Initialize();
}