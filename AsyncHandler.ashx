<%@ WebHandler Language="C#" Class="AsyncHandler" %>

using System;
using System.Web;
using System.Threading;
using System.Diagnostics;
using System.Web.Script.Serialization;

public class AsyncHandler : IHttpAsyncHandler, System.Web.SessionState.IReadOnlySessionState
{
    public IAsyncResult BeginProcessRequest(HttpContext ctx, AsyncCallback cb, Object obj)
    {
        AsyncResult currentAsyncState = new AsyncResult(ctx, cb, obj);
        
        ThreadPool.QueueUserWorkItem(new WaitCallback(RequestWorker), currentAsyncState);

        return currentAsyncState;
    }
    
    public void EndProcessRequest(IAsyncResult ar)
    {
    }


    
      
    public bool IsReusable
    {
        get { return true; }
    }
    
    public void ProcessRequest(HttpContext context)
    {
    }
    
   
    
    
    private void RequestWorker(Object obj)
    {
        // obj - second parametr in ThreadPool.QueueUserWorkItem()
        AsyncResult myAsyncResult = obj as AsyncResult;

        string command = myAsyncResult._context.Request.QueryString["cmd"];
        string guid = myAsyncResult._context.Request.QueryString["guid"];

        switch (command)
        {
            case "sendMessage":
                String myText,clientId;
                 if (myAsyncResult._context.Request.QueryString["myText"] != null)
                {
                    clientId = (myAsyncResult._context.Request.QueryString["clientId"]);
                    myText = (myAsyncResult._context.Request.QueryString["myText"]);
                    AsyncServer.sendMessage(myText, clientId);
                    myAsyncResult.CompleteRequest();
                }
                break;
            case "register":
                  String type;

             
                  if (myAsyncResult._context.Request.QueryString["type"] != null)
                {
                    type = (myAsyncResult._context.Request.QueryString["type"]);

                  AsyncServer.RegicterClient(myAsyncResult, type);
                 myAsyncResult.CompleteRequest();
                }
                break;
            case "unregister":
                String unregisterType;
                  if (myAsyncResult._context.Request.QueryString["type"] != null)
                {
                    unregisterType = (myAsyncResult._context.Request.QueryString["type"]);

                    AsyncServer.UnregisterClient(myAsyncResult, unregisterType);
                 myAsyncResult.CompleteRequest();
                }
            
                break;
            case "firstTime":
                //AsyncServer.FirstTimeClient(myAsyncResult);
                myAsyncResult.CompleteRequest();
                break;
            case "process":
                if (guid != null)
                {
                    AsyncServer.UpdateClient(myAsyncResult, guid);                   
                }
                break;

        }
    }
}