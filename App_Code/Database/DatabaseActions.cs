using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
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

    protected async void RemoveObject(string objId, string collectionName)
    {
        var collection = database.GetCollection(collectionName);
        await collection.RemoveAsync(new QueryDocument("_id", objId));
    }

    protected async void UpdateObject(DatabaseObject obj, string collectionName)
    {
        var collection = database.GetCollection(collectionName);
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
        var obj =  collection.FindAllAs<ObjectType>();    
        return obj.ToList<ObjectType>();
    }

}