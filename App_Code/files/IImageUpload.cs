using System.Collections.Generic;                                                                                                         
using System.ServiceModel;
using System.ServiceModel.Web;
using System.IO;
[ServiceContract]
public interface IImageUpload
{
    [OperationContract]
    [WebInvoke(
         Method = "POST",
         ResponseFormat = WebMessageFormat.Json,
         BodyStyle = WebMessageBodyStyle.Bare,
         UriTemplate = "FileUpload")
    ]
   void FileUpload(string fileName, Stream fileStream);

   
}