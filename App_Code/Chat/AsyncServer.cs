using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Web.Script.Serialization;

public class AsyncServer
{
        private static Object _lock = new Object();
    private static List<AsyncResult> _clientStateList = new List<AsyncResult>();
    private static int z = 0;
    private static int chatWebCounter = 0;

    static AsyncServer()
    {
    }

    public static void sendMessage(String message, String clientId,string type)
    {
        lock (_lock)
        {
            var clientService = new ClientService();

            Message currentMessage = new Message(clientId, message);
            new MessageService().AddOnlineMessage(currentMessage);

            var allMessages = new MessageService().GetAllOnlineMessagesOfClient(clientId);
     
            var chatMessage = new ChatMessage(clientId, allMessages);
            //arrchatMessage[z] = new chatMessage();
            //arrchatMessage[z].content = message;
            //z++;
           
            //for (int y = 0; y < arrchatMessage.Length; y++)
            //{
            //    if (arrchatMessage[y] != null)
            //    {
            //        counter++;
            //    }
            //}

            //chatMessage[] temp_arrchatMessage = new chatMessage[counter];
            //for (int y = 0; y < arrchatMessage.Length; y++)
            //{
            //    if (arrchatMessage[y] != null)
            //    {
            //        temp_arrchatMessage[y] = arrchatMessage[y];
            //    }
            //}
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


                //admin = new AdminService().GetAdmin(clientState.ClientGuid).adminId;
                //if (admin != null || clientState.ClientGuid==clinetId)
                //{
                //    if (clientState._context.Session != null)
                //    {
                //        clientState._context.Response.Write(resultStr);
                //        clientState.CompleteRequest();
                //    }
                //}
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

    //public static void RegicterClient(AsyncResult state)
    //{
    //    lock (_lock)
    //    {
    //        state.ClientGuid = Guid.NewGuid().ToString("N");
    //        //_clientStateList.Add(state); //#

    //        var currentClient = new Client(state.ClientGuid, chatWebCounter);
    //        new ClientService().AddClient(currentClient);

    //        if (state._state != null)
    //        {
    //            var collection = new DatabaseService().GetCollection("AsyncResult");
    //            collection.Insert(state);
    //            state._id = Convert.ToString((ObjectId.GenerateNewId()));
    //        }

    //        state._context.Response.Write(state.ClientGuid.ToString());
    //    }
    //}

    public static void RegicterClient(AsyncResult state, string type)
    {
        lock (_lock)
        {
            var clientService = new ClientService();

            state.ClientGuid = chatWebCounter.ToString();
            if (type == "admin")
            {
                chatWebCounter++;
                state.ClientGuid = state.ClientGuid + 123;
                var currentAdmin = new Admin((state.ClientGuid));
                clientService.AddClient(currentAdmin);
            }
            else
            {
                chatWebCounter++;
                var currentClient = new Web(state.ClientGuid, chatWebCounter);
                clientService.AddClient(currentClient);
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

                //var allWeb = clientService.GetAllWebs();
                //string resultStr = myJavaScriptSerializer.Serialize(allWeb);

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

                        //Debug.Write(clientState.ClientGuid);
                       
                        //{

                        //    if (clientState._context.Session != null)
                        //    {
                        //        clientState._context.Response.Write(resultStr);
                        //        clientState.CompleteRequest();
                        //    }
                        //}
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
            }else{
                Debug.Write(type);
                clientService.RemoveWeb(clientId);
                _clientStateList.Remove(state);

                JavaScriptSerializer myJavaScriptSerializer = new JavaScriptSerializer();
                var allWeb = clientService.GetAllWebs();
                string resultStr = myJavaScriptSerializer.Serialize(allWeb);
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

    //public static void FirstTimeClient(AsyncResult state)
    //{
    //    int counter = 0;
    //    lock (_lock)
    //    {
    //        JavaScriptSerializer myJavaScriptSerializer = new JavaScriptSerializer();
    //        for (int y = 0; y < arrchatMessage.Length; y++)
    //        {
    //            if (arrchatMessage[y] != null)
    //            {
    //                counter++;
    //            }
    //        }

    //        chatMessage[] temp_arrchatMessage = new chatMessage[counter];
    //        for (int y = 0; y < arrchatMessage.Length; y++)
    //        {
    //            if (arrchatMessage[y] != null)
    //            {
    //                temp_arrchatMessage[y] = arrchatMessage[y];
    //            }
    //        }
    //        string resultStr = myJavaScriptSerializer.Serialize(temp_arrchatMessage);

    //        state._context.Response.Write(resultStr);
    //    }
    //}

}
