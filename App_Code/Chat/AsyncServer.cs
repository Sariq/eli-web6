using System;
using System.Collections.Generic;

using System.Web.Script.Serialization;

public class AsyncServer
{
    private static Object _lock = new Object();

    private static List<AsyncResult> _clientStateList = new List<AsyncResult>();
    private static int z=0;

    private static chatMessage[] arrchatMessage;

    static AsyncServer()
    {
        arrchatMessage = new chatMessage[10];
    }


    public static void sendMessage(String message)
    {
        lock (_lock)
        {
           
                arrchatMessage[z] = new chatMessage();
                arrchatMessage[z].content = message;
                z++;
                JavaScriptSerializer myJavaScriptSerializer = new JavaScriptSerializer();
                string resultStr = myJavaScriptSerializer.Serialize(arrchatMessage);
                foreach (AsyncResult clientState in _clientStateList)
                {
                    if (clientState._context.Session != null)
                    {
                        clientState._context.Response.Write(resultStr);
                        clientState.CompleteRequest();
                    }
                }
            
        }
    }
    public static void UpdateClient(AsyncResult state, String guid)
    {
        lock (_lock)
        {
            AsyncResult clientState = _clientStateList.Find(
                delegate(AsyncResult cs)
                {
                    return cs.ClientGuid == guid;
                }
            );
            if (clientState != null)
            {
                clientState._context = state._context;
                clientState._state = state._state;
                clientState._callback = state._callback;
            }
        }
    }

    public static void RegicterClient(AsyncResult state)
    {
        lock (_lock)
        {
            state.ClientGuid = Guid.NewGuid().ToString("N");
            _clientStateList.Add(state);
            state._context.Response.Write(state.ClientGuid.ToString());
        }
    }

    public static void UnregisterClient(AsyncResult state)
    {
        lock (_lock)
        {
             _clientStateList.Remove(state);
        }
    }

    public static void FirstTimeClient(AsyncResult state)
    {
        lock (_lock)
        {
            JavaScriptSerializer myJavaScriptSerializer = new JavaScriptSerializer();
            string resultStr = myJavaScriptSerializer.Serialize(arrchatMessage);
           
            state._context.Response.Write(resultStr);
        }
    }

}
