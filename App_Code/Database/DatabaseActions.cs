using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.ServiceModel.Web;
using System.Threading.Tasks;

public class DatabaseActions
{
    DatabaseService database = new DatabaseService();

    protected async void InsertObject(DatabaseObject obj, string collectionName)
    {
        var collection = database.GetCollection(collectionName);
        obj._id = Convert.ToString((ObjectId.GenerateNewId()));
        
        await collection.InsertAsync(obj);
    }

    protected void InsertObjectNotAsync(DatabaseObject obj, string collectionName)
    {
        var collection = database.GetCollection(collectionName);
        obj._id = Convert.ToString((ObjectId.GenerateNewId()));
        collection.Insert(obj);
    }

    protected async Task<string> InsertObjectAndReturnId(DatabaseObject obj, string collectionName)
    {
        var collection = database.GetCollection(collectionName);
        obj._date = Convert.ToDateTime(DateTime.Now.ToString());
        obj._id = Convert.ToString((ObjectId.GenerateNewId()));
        await collection.InsertAsync(obj);
        return obj._id;
    }

    protected async Task<Object> InsertObjectAndReturnTheObject<ObjectType>(DatabaseObject obj, string collectionName)
    {
        var collection = database.GetCollection(collectionName);
        obj._id = Convert.ToString((ObjectId.GenerateNewId()));
        await collection.InsertAsync(obj);
        return GetObject<ObjectType>(obj._id, collectionName).Result;
    }

    protected async void RemoveObject(string objId, string collectionName)
    {
        var collection = database.GetCollection(collectionName);
        await collection.RemoveAsync(new QueryDocument("_id", objId));
    }

    protected async void RemoveObject(string fieldName, string fieldValue, string collectionName)
    {
        var collection = database.GetCollection(collectionName);
        await collection.RemoveAsync(new QueryDocument(fieldName, fieldValue));
    }

    protected async void UpdateObject(DatabaseObject obj, string collectionName)
    {
        var collection = database.GetCollection(collectionName);
        Debug.Write(obj._id);
        await collection.UpdateAsync(new QueryDocument("_id", obj._id), new UpdateDocument(new BsonDocument(obj.ToBsonDocument())));
    }

    protected async Task<ObjectType> GetObject<ObjectType>(string id, string collectionName)
    {
        return await GetObject<ObjectType>(fieldName: "_id", fieldValue: id, collectionName: collectionName);
    }

    protected async Task<ObjectType> GetObject<ObjectType>(string fieldName, string fieldValue, string collectionName)
    {
        var collection = database.GetCollection(collectionName);
        var obj = await collection.FindOneAsAsync<ObjectType>(new QueryDocument(fieldName, fieldValue));
        return obj;
    }

    protected List<ObjectType> GetAllObject<ObjectType>(string collectionName)
    {
        var collection = database.GetCollection(collectionName);
        var obj = collection.FindAllAs<ObjectType>();
         return obj.ToList<ObjectType>();
    }

    protected List<ObjectType> GetAllObject<ObjectType>(string fieldName, BsonValue fieldValue, string collectionName)
    {
        var collection = database.GetCollection(collectionName);

        var searchQuery = Query.EQ(fieldName, fieldValue);
        var obj = collection.FindAs<ObjectType>(searchQuery);
        return obj.ToList<ObjectType>();
    }

    protected List<ObjectType> GetAllObject<ObjectType>(List<string> objectsId, string collectionName)
    {
        var collection = database.GetCollection(collectionName);
        var objList = new List<ObjectType>();
        foreach (string id in objectsId)
        {
            Debug.Write(id);
            var obj = GetObject<ObjectType>(id, collectionName).Result;
            objList.Add(obj);
        }
        return objList;
    }  

}