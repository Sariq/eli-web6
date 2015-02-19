using System;
using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;
using System.IO;


public class ImageUploadService : IImageUpload
{

    public void FileUpload(string fileName, Stream fileStream)
    {

        FileStream fileToupload = new FileStream("D:\\ELI\\" + fileName, FileMode.Create);

        byte[] bytearray = new byte[10000];
        int bytesRead, totalBytesRead = 0;
        do
        {
            bytesRead = fileStream.Read(bytearray, 0, bytearray.Length);
            totalBytesRead += bytesRead;
        } while (bytesRead > 0);

        fileToupload.Write(bytearray, 0, bytearray.Length);
        fileToupload.Close();
        fileToupload.Dispose();

    }

}