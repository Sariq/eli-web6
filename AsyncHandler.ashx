<%@ WebHandler Language="C#" Class="AsyncHandler" %>

using System;
using System.Web;
using System.Threading;

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
                String myText;
                 if (myAsyncResult._context.Request.QueryString["myText"] != null)
                {
                    myText = (myAsyncResult._context.Request.QueryString["myText"]);
                    AsyncServer.sendMessage(myText);
                    myAsyncResult.CompleteRequest();
                }
                break;
            case "register":
                AsyncServer.RegicterClient(myAsyncResult);
                 myAsyncResult.CompleteRequest();
                break;
            case "unregister":
                AsyncServer.UnregisterClient(myAsyncResult);
                myAsyncResult.CompleteRequest();
                break;
            case "firstTime":
                AsyncServer.FirstTimeClient(myAsyncResult);
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