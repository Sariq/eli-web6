// Auto-generated, do not modify
using System;
using System.Threading;
using System.Threading.Tasks;
using MongoDB.Driver;

public static class MongoAsyncExt
{
    public static Task<System.Int32> CountAsync(this MongoCollection collection)
    {
        var tcs = new TaskCompletionSource<System.Int32>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = (int)(collection.Count());
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<System.Int32> CountAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query)
    {
        var tcs = new TaskCompletionSource<System.Int32>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = (int)(collection.Count(query));
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.SafeModeResult> CreateIndexAsync(this MongoCollection collection, MongoDB.Driver.IMongoIndexKeys keys, MongoDB.Driver.IMongoIndexOptions options)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.SafeModeResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.CreateIndex(keys, options);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.SafeModeResult> CreateIndexAsync(this MongoCollection collection, MongoDB.Driver.IMongoIndexKeys keys)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.SafeModeResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.CreateIndex(keys);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.SafeModeResult> CreateIndexAsync(this MongoCollection collection, System.String[] keyNames)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.SafeModeResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.CreateIndex(keyNames);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<System.Collections.Generic.IEnumerable<MongoDB.Bson.BsonValue>> DistinctAsync(this MongoCollection collection, System.String key)
    {
        var tcs = new TaskCompletionSource<System.Collections.Generic.IEnumerable<MongoDB.Bson.BsonValue>>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Distinct(key);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<System.Collections.Generic.IEnumerable<MongoDB.Bson.BsonValue>> DistinctAsync(this MongoCollection collection, System.String key, MongoDB.Driver.IMongoQuery query)
    {
        var tcs = new TaskCompletionSource<System.Collections.Generic.IEnumerable<MongoDB.Bson.BsonValue>>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Distinct(key, query);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task DropAsync(this MongoCollection collection)
    {
        var tcs = new TaskCompletionSource<bool>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                collection.Drop();
                tcs.SetResult(true);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.CommandResult> DropAllIndexesAsync(this MongoCollection collection)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.CommandResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.DropAllIndexes();
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.CommandResult> DropIndexAsync(this MongoCollection collection, MongoDB.Driver.IMongoIndexKeys keys)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.CommandResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.DropIndex(keys);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.CommandResult> DropIndexAsync(this MongoCollection collection, System.String[] keyNames)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.CommandResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.DropIndex(keyNames);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.CommandResult> DropIndexByNameAsync(this MongoCollection collection, System.String indexName)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.CommandResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.DropIndexByName(indexName);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task EnsureIndexAsync(this MongoCollection collection, MongoDB.Driver.IMongoIndexKeys keys, MongoDB.Driver.IMongoIndexOptions options)
    {
        var tcs = new TaskCompletionSource<bool>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                collection.EnsureIndex(keys, options);
                tcs.SetResult(true);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task EnsureIndexAsync(this MongoCollection collection, MongoDB.Driver.IMongoIndexKeys keys)
    {
        var tcs = new TaskCompletionSource<bool>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                collection.EnsureIndex(keys);
                tcs.SetResult(true);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task EnsureIndexAsync(this MongoCollection collection, System.String[] keyNames)
    {
        var tcs = new TaskCompletionSource<bool>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                collection.EnsureIndex(keyNames);
                tcs.SetResult(true);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<System.Boolean> ExistsAsync(this MongoCollection collection)
    {
        var tcs = new TaskCompletionSource<System.Boolean>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Exists();
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.MongoCursor<T>> FindAllAsAsync<T>(this MongoCollection collection)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.MongoCursor<T>>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.FindAllAs<T>();
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.FindAndModifyResult> FindAndModifyAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, MongoDB.Driver.IMongoSortBy sortBy, MongoDB.Driver.IMongoUpdate update)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.FindAndModifyResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.FindAndModify(query, sortBy, update);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.FindAndModifyResult> FindAndModifyAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, MongoDB.Driver.IMongoSortBy sortBy, MongoDB.Driver.IMongoUpdate update, System.Boolean returnNew)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.FindAndModifyResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.FindAndModify(query, sortBy, update, returnNew);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.FindAndModifyResult> FindAndModifyAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, MongoDB.Driver.IMongoSortBy sortBy, MongoDB.Driver.IMongoUpdate update, System.Boolean returnNew, System.Boolean upsert)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.FindAndModifyResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.FindAndModify(query, sortBy, update, returnNew, upsert);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.FindAndModifyResult> FindAndModifyAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, MongoDB.Driver.IMongoSortBy sortBy, MongoDB.Driver.IMongoUpdate update, MongoDB.Driver.IMongoFields fields, System.Boolean returnNew, System.Boolean upsert)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.FindAndModifyResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.FindAndModify(query, sortBy, update, fields, returnNew, upsert);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.FindAndModifyResult> FindAndRemoveAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, MongoDB.Driver.IMongoSortBy sortBy)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.FindAndModifyResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.FindAndRemove(query, sortBy);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.MongoCursor<T>> FindAsAsync<T>(this MongoCollection collection, MongoDB.Driver.IMongoQuery query)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.MongoCursor<T>>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.FindAs<T>(query);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<T> FindOneAsAsync<T>(this MongoCollection collection)
    {
        var tcs = new TaskCompletionSource<T>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.FindOneAs<T>();
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<T> FindOneAsAsync<T>(this MongoCollection collection, MongoDB.Driver.IMongoQuery query)
    {
        var tcs = new TaskCompletionSource<T>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.FindOneAs<T>(query);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<T> FindOneByIdAsAsync<T>(this MongoCollection collection, MongoDB.Bson.BsonValue id)
    {
        var tcs = new TaskCompletionSource<T>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.FindOneByIdAs<T>(id);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.GeoNearResult<T>> GeoNearAsAsync<T>(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, System.Double x, System.Double y, System.Int32 limit)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.GeoNearResult<T>>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.GeoNearAs<T>(query, x, y, limit);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.GeoNearResult<T>> GeoNearAsAsync<T>(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, System.Double x, System.Double y, System.Int32 limit, MongoDB.Driver.IMongoGeoNearOptions options)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.GeoNearResult<T>>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.GeoNearAs<T>(query, x, y, limit, options);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }

    public static Task<MongoDB.Driver.CollectionStatsResult> GetStatsAsync(this MongoCollection collection)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.CollectionStatsResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.GetStats();
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<System.Int64> GetTotalDataSizeAsync(this MongoCollection collection)
    {
        var tcs = new TaskCompletionSource<System.Int64>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.GetTotalDataSize();
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<System.Int64> GetTotalStorageSizeAsync(this MongoCollection collection)
    {
        var tcs = new TaskCompletionSource<System.Int64>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.GetTotalStorageSize();
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<System.Collections.Generic.IEnumerable<MongoDB.Bson.BsonDocument>> GroupAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, MongoDB.Bson.BsonJavaScript keyFunction, MongoDB.Bson.BsonDocument initial, MongoDB.Bson.BsonJavaScript reduce, MongoDB.Bson.BsonJavaScript finalize)
    {
        var tcs = new TaskCompletionSource<System.Collections.Generic.IEnumerable<MongoDB.Bson.BsonDocument>>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Group(query, keyFunction, initial, reduce, finalize);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<System.Collections.Generic.IEnumerable<MongoDB.Bson.BsonDocument>> GroupAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, MongoDB.Driver.IMongoGroupBy keys, MongoDB.Bson.BsonDocument initial, MongoDB.Bson.BsonJavaScript reduce, MongoDB.Bson.BsonJavaScript finalize)
    {
        var tcs = new TaskCompletionSource<System.Collections.Generic.IEnumerable<MongoDB.Bson.BsonDocument>>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Group(query, keys, initial, reduce, finalize);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<System.Collections.Generic.IEnumerable<MongoDB.Bson.BsonDocument>> GroupAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, System.String key, MongoDB.Bson.BsonDocument initial, MongoDB.Bson.BsonJavaScript reduce, MongoDB.Bson.BsonJavaScript finalize)
    {
        var tcs = new TaskCompletionSource<System.Collections.Generic.IEnumerable<MongoDB.Bson.BsonDocument>>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Group(query, key, initial, reduce, finalize);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<System.Boolean> IndexExistsAsync(this MongoCollection collection, MongoDB.Driver.IMongoIndexKeys keys)
    {
        var tcs = new TaskCompletionSource<System.Boolean>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.IndexExists(keys);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<System.Boolean> IndexExistsAsync(this MongoCollection collection, System.String[] keyNames)
    {
        var tcs = new TaskCompletionSource<System.Boolean>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.IndexExists(keyNames);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<System.Boolean> IndexExistsByNameAsync(this MongoCollection collection, System.String indexName)
    {
        var tcs = new TaskCompletionSource<System.Boolean>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.IndexExistsByName(indexName);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.SafeModeResult> InsertAsync<T>(this MongoCollection collection, T document)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.SafeModeResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Insert<T>(document);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.SafeModeResult> InsertAsync<T>(this MongoCollection collection, T document, MongoDB.Driver.SafeMode safeMode)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.SafeModeResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Insert<T>(document, safeMode);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<System.Collections.Generic.IEnumerable<MongoDB.Driver.SafeModeResult>> InsertBatchAsync<T>(this MongoCollection collection, System.Collections.Generic.IEnumerable<T> documents)
    {
        var tcs = new TaskCompletionSource<System.Collections.Generic.IEnumerable<MongoDB.Driver.SafeModeResult>>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.InsertBatch<T>(documents);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<System.Collections.Generic.IEnumerable<MongoDB.Driver.SafeModeResult>> InsertBatchAsync<T>(this MongoCollection collection, System.Collections.Generic.IEnumerable<T> documents, MongoDB.Driver.SafeMode safeMode)
    {
        var tcs = new TaskCompletionSource<System.Collections.Generic.IEnumerable<MongoDB.Driver.SafeModeResult>>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.InsertBatch<T>(documents, safeMode);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<System.Boolean> IsCappedAsync(this MongoCollection collection)
    {
        var tcs = new TaskCompletionSource<System.Boolean>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.IsCapped();
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.MapReduceResult> MapReduceAsync(this MongoCollection collection, MongoDB.Bson.BsonJavaScript map, MongoDB.Bson.BsonJavaScript reduce, MongoDB.Driver.IMongoMapReduceOptions options)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.MapReduceResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.MapReduce(map, reduce, options);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.MapReduceResult> MapReduceAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, MongoDB.Bson.BsonJavaScript map, MongoDB.Bson.BsonJavaScript reduce, MongoDB.Driver.IMongoMapReduceOptions options)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.MapReduceResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.MapReduce(query, map, reduce, options);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.MapReduceResult> MapReduceAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, MongoDB.Bson.BsonJavaScript map, MongoDB.Bson.BsonJavaScript reduce)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.MapReduceResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.MapReduce(query, map, reduce);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.MapReduceResult> MapReduceAsync(this MongoCollection collection, MongoDB.Bson.BsonJavaScript map, MongoDB.Bson.BsonJavaScript reduce)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.MapReduceResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.MapReduce(map, reduce);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.CommandResult> ReIndexAsync(this MongoCollection collection)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.CommandResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.ReIndex();
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.SafeModeResult> RemoveAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.SafeModeResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Remove(query);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.SafeModeResult> RemoveAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, MongoDB.Driver.SafeMode safeMode)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.SafeModeResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Remove(query, safeMode);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.SafeModeResult> RemoveAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, MongoDB.Driver.RemoveFlags flags)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.SafeModeResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Remove(query, flags);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.SafeModeResult> RemoveAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, MongoDB.Driver.RemoveFlags flags, MongoDB.Driver.SafeMode safeMode)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.SafeModeResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Remove(query, flags, safeMode);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.SafeModeResult> RemoveAllAsync(this MongoCollection collection)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.SafeModeResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.RemoveAll();
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.SafeModeResult> RemoveAllAsync(this MongoCollection collection, MongoDB.Driver.SafeMode safeMode)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.SafeModeResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.RemoveAll(safeMode);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }

    public static Task<MongoDB.Driver.SafeModeResult> SaveAsync<T>(this MongoCollection collection, T document)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.SafeModeResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Save<T>(document);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.SafeModeResult> SaveAsync<T>(this MongoCollection collection, T document, MongoDB.Driver.SafeMode safeMode)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.SafeModeResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Save<T>(document, safeMode);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<System.String> ToStringAsync(this MongoCollection collection)
    {
        var tcs = new TaskCompletionSource<System.String>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.ToString();
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.SafeModeResult> UpdateAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, MongoDB.Driver.IMongoUpdate update)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.SafeModeResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Update(query, update);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.SafeModeResult> UpdateAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, MongoDB.Driver.IMongoUpdate update, MongoDB.Driver.SafeMode safeMode)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.SafeModeResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Update(query, update, safeMode);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.SafeModeResult> UpdateAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, MongoDB.Driver.IMongoUpdate update, MongoDB.Driver.UpdateFlags flags)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.SafeModeResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Update(query, update, flags);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.SafeModeResult> UpdateAsync(this MongoCollection collection, MongoDB.Driver.IMongoQuery query, MongoDB.Driver.IMongoUpdate update, MongoDB.Driver.UpdateFlags flags, MongoDB.Driver.SafeMode safeMode)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.SafeModeResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Update(query, update, flags, safeMode);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.ValidateCollectionResult> ValidateAsync(this MongoCollection collection)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.ValidateCollectionResult>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Validate();
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.MongoCursor<T>> FindAsync<T>(this MongoCollection<T> collection, MongoDB.Driver.IMongoQuery query)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.MongoCursor<T>>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.Find(query);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.MongoCursor<T>> FindAllAsync<T>(this MongoCollection<T> collection)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.MongoCursor<T>>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.FindAll();
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<T> FindOneAsync<T>(this MongoCollection<T> collection)
    {
        var tcs = new TaskCompletionSource<T>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.FindOne();
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<T> FindOneAsync<T>(this MongoCollection<T> collection, MongoDB.Driver.IMongoQuery query)
    {
        var tcs = new TaskCompletionSource<T>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.FindOne(query);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<T> FindOneByIdAsync<T>(this MongoCollection<T> collection, MongoDB.Bson.BsonValue id)
    {
        var tcs = new TaskCompletionSource<T>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.FindOneById(id);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.GeoNearResult<T>> GeoNearAsync<T>(this MongoCollection<T> collection, MongoDB.Driver.IMongoQuery query, System.Double x, System.Double y, System.Int32 limit)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.GeoNearResult<T>>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.GeoNear(query, x, y, limit);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
    public static Task<MongoDB.Driver.GeoNearResult<T>> GeoNearAsync<T>(this MongoCollection<T> collection, MongoDB.Driver.IMongoQuery query, System.Double x, System.Double y, System.Int32 limit, MongoDB.Driver.IMongoGeoNearOptions options)
    {
        var tcs = new TaskCompletionSource<MongoDB.Driver.GeoNearResult<T>>();
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                var result = collection.GeoNear(query, x, y, limit, options);
                tcs.SetResult(result);
            }
            catch (Exception exc) { tcs.SetException(exc); }
        });
        return tcs.Task;
    }
}