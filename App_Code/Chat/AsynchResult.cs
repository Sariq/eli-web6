using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Runtime.Serialization;
using System.Threading;
using System.Web;

[DataContract]
public class AsyncResult : DatabaseObject, IAsyncResult
{
    [BsonElement]
    public HttpContext _context;
    [BsonSerializer]
    public AsyncCallback _callback;
    [DataMember]
    public object _state;
    [DataMember]
    public string ClientGuid;
    [DataMember]
    private Boolean _isCompleted;

    public AsyncResult(HttpContext context, AsyncCallback callback, object data)
    {
        _context = context;
        _callback = callback;
        _state = data;
        _isCompleted = false;
    }


    public void CompleteRequest()
    {
        _isCompleted = true;
        _callback(this);
    }
    
    public Boolean CompletedSynchronously
    {
        get
        {
            return false;
        }
    }

    public bool IsCompleted
    {
        get
        {
            return _isCompleted;
        }
    }

    public object AsyncState
    {
        get
        {
            return _state;
        }
    }

    public WaitHandle AsyncWaitHandle
    {
        get
        {
            return new ManualResetEvent(false);
        }
    }
 }
