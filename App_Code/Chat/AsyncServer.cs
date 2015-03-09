using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Web.Script.Serialization;

public class AsyncServer
{
    private static Object _lock = new Object();
    private static List<AsyncResult> _clientStateList = new List<AsyncResult>();
    private static int chatWebCounter = 0;

    public static void sendMessage(String message, String clientId,string type)
    {
        lock (_lock)
        {
            var clientService = new ClientService();

            ChatMessage currentMessage = new ChatMessage(clientId, message, type);
            new ChatMessageService().AddOnlineMessage(currentMessage);

            var allMessages = new ChatMessageService().GetAllOnlineMessagesOfClient(clientId);
     
            var chatMessage = new ChatMessageArr(clientId, allMessages);

            JavaScriptSerializer myJavaScriptSerializer = new JavaScriptSerializer();
            string resultStr = myJavaScriptSerializer.Serialize(chatMessage);
            foreach (AsyncResult clientState in _clientStateList)
            {
                if (clientState.ClientGuid == clientId)
                {
                    if (clientState._context.Session != null)
                    {
                        clientState._context.Response.Write(resultStr);
                        clientState.CompleteRequest();
                    }
                }
                try
                {
                    var admin = clientService.GetAdmin(clientState.ClientGuid);
                    if (admin != null)
                    {
                        if (clientState._context.Session != null)
                        {
                            clientState._context.Response.Write(resultStr);
                            clientState.CompleteRequest();
                        }
                    }
                }
                catch {}
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


    public static void RegicterClient(AsyncResult state, string type)
    {
        lock (_lock)
        {
            var clientService = new ClientService();
            state.ClientGuid = "0";
            state.ClientGuid += Guid.NewGuid().ToString("N");
            if (type == "admin")
            {

                var currentAdmin = new Admin((state.ClientGuid));
                clientService.AddAdmin(currentAdmin);
            }
            else
            {
                chatWebCounter++;
                var currentClient = new Web(state.ClientGuid, chatWebCounter);
                clientService.AddWeb(currentClient);
            }

            _clientStateList.Add(state);
            Debug.Write(state.ClientGuid.ToString());
            state._context.Response.Write(state.ClientGuid.ToString());

            if (type == "web")
            {
                JavaScriptSerializer myJavaScriptSerializer = new JavaScriptSerializer();
                
                var allWeb = clientService.GetAllWebs();
                var allWebArr = new websData(allWeb);
                string resultStr = myJavaScriptSerializer.Serialize(allWebArr);

                foreach (AsyncResult clientState in _clientStateList)
                {  
                    try
                    {
                        var admin = clientService.GetAdmin(clientState.ClientGuid);
                        if (admin != null)
                        {
                            if (clientState._context.Session != null)
                            {
                                clientState._context.Response.Write(resultStr);
                                clientState.CompleteRequest();
                            }
                        }
                    }
                    catch { }
                }
            }
        }
    }

    public static void UnregisterClient(AsyncResult state, string type, String clientId)
    {
        lock (_lock)
        {
            var clientService = new ClientService();
           
            if (type == "admin")
            {
                clientService.RemoveAdmin(clientId);
            }
            else
            {
                Debug.Write(type);
                Web web=clientService.GetWeb(clientId);
                web.isOnline =false;
                clientService.UpdateWebNotAsync(web);
               // clientService.RemoveWeb(clientId);
                _clientStateList.Remove(state);

                JavaScriptSerializer myJavaScriptSerializer = new JavaScriptSerializer();
                var allWeb = clientService.GetAllWebs();
                var allWebArr = new websData(allWeb);
                string resultStr = myJavaScriptSerializer.Serialize(allWebArr);
                foreach (AsyncResult clientState in _clientStateList)
                {
                    try
                    {
                        var admin = clientService.GetAdmin(clientState.ClientGuid);
                        if (admin != null)
                        {
                            if (clientState._context.Session != null)
                            {
                                clientState._context.Response.Write(resultStr);
                                clientState.CompleteRequest();
                            }
                        }
                    }
                    catch { }
                }
            }
        }
    }
}
