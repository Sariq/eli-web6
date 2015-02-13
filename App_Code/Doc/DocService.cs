using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;
using System;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.GridFS;
using System.IO;
using MongoDB.Driver.Builders;

public class DocService : DatabaseActions, IDoc
{
    //DatabaseService databaseService = new DatabaseService();

    //public void AddDoc()
    //{
    //    try
    //    {
    //        var database = databaseService.GetDatabase();

    //        //var fileName = "D:\\Untitled.png";

    //        //using (var fs = new FileStream(fileName, FileMode.Open))
    //        //{
    //        //    var gridFsInfo = database.GridFS.Upload(fileName);
    //        //    var _id = Convert.ToString((ObjectId.GenerateNewId()));
    //        //    var file = database.GridFS.FindOne(Query.EQ("_id", _id));
    //        //}


    //        //var fileName = "D:\\Current.pdf";
    //        //var newFileName = "D:\\New.pdf";
            
    //        //using (var fs = new FileStream(fileName, FileMode.Open))
    //        //{
    //        //    var gridFsInfo = database.GridFS..Upload((fs, fileName);
    //        //    var fileId = gridFsInfo.Id;

    //        //    var file = database.GridFS.FindOne(Query.EQ("_id", fileId));
    //        //    using (var stream = file.OpenRead())
    //        //    {
    //        //        var bytes = new byte[stream.Length];
    //        //        stream.Read(bytes, 0, (int)stream.Length);
    //        //        using (var newFs = new FileStream(newFileName, FileMode.Create))
    //        //        {
    //        //            newFs.Write(bytes, 0, bytes.Length);
    //        //        }
    //        //    }
    //        //}

    //        //var fileName = "clip_image071.jpg";

    //        //var gridFs = new MongoGridFS(database.GetDatabase());
    //        //var id = ObjectId.Empty;
            
    //        //using (var filea = File.OpenRead(fileName))
    //        //{
    //        //    id = gridFs.Upload(AddFile(filea, fileName);
    //        //}

    //        //using (var file = gridFs.GetFile(id))
    //        //{
    //        //    var buffer = new byte[file.Length];
    //        //    // note - you'll probably want to read in
    //        //    // small blocks or stream to avoid 
    //        //    // allocating large byte arrays like this
    //        //    file.Read(buffer, 0, (int)file.Length);
    //        //}        




    //        //InsertObjectNotAsync(file, "File");
    //    }
    //    catch (MongoDuplicateKeyException)
    //    {
    //        var error = new Error(Error.ErrorType.DocIsAlreadyExist);
    //        throw new WebFaultException<Error>(error, HttpStatusCode.BadRequest);
    //    }
    //}

    //public void RemoveDoc(string docId)
    //{
    //    RemoveObject(docId, "Doc");
    //}

    //public void UpdateDoc(Doc doc)
    //{
    //    UpdateObject(doc, "Doc");
    //}

    //public Doc GetDoc(string docId)
    //{
    //    return GetObject<Doc>(docId, "Doc").Result; 
    //}

    //public List<Doc> GetAllDocs()
    //{
    //    return GetAllObject<Doc>("Doc");
    //}

}