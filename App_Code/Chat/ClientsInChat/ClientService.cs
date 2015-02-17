using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;
using System;
using MongoDB.Driver;

public class ClientService : DatabaseActions, IClient
{ 

    public void AddClient(Client client)
    {
        var success = false;
        while (!success)
        {
            try
            {
                if (client.GetType() ==  new Admin("").GetType())
                    InsertObjectNotAsync(client, "Admin");
                else
                    InsertObjectNotAsync(client, "Web");
                success = true;
            }
            catch (MongoDuplicateKeyException) { }
        }
    }

    public void RemoveWeb(string clientId)
    {
        RemoveObject(clientId, "Web");
    }

    public void RemoveAdmin(string clientId)
    {
        RemoveObject(clientId, "Admin");
    }

    public Web GetWeb(string clientId)
    {
        return GetObject<Web>("clientId", clientId, "Web").Result;
    }

    public Admin GetAdmin(string clientId)
    {
        return GetObject<Admin>("clientId", clientId, "Admin").Result;
    }

    public List<Web> GetAllWebs()
    {
        return GetAllObject<Web>("Web");
    }

    public List<Admin> GetAllAdmins()
    {
        return GetAllObject<Admin>("Admin");
    }

    public bool isAdminOnline()
    {
        return (GetAllAdmins().Count > 0);
    }

}