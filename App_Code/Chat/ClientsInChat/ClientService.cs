using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;
using System;
using MongoDB.Driver;
using System.Diagnostics;

public class ClientService : DatabaseActions, IClient
{

    public void AddWeb(Web web)
    {
        InsertObjectNotAsync(web, "Web");
    }

    public void AddAdmin(Admin admin)
    {
        InsertObjectNotAsync(admin, "Admin");
    }



    public void RemoveAdmin(string adminId)
    {
        RemoveObject("clientId", adminId, "Admin");
    }
    public void RemoveWeb(string webId)
    {
        Debug.Write(webId);
        RemoveObject("_id", webId, "Web");
    }

    public void UpdateWeb(Web web)
    {
        UpdateObject(web, "Web");
    }
    public void UpdateWebNotAsync(Web web)
    {
        UpdateObjectNotAsync(web, "Web");
    }

    public Web GetWeb(string webId)
    {
        return GetObject<Web>("clientId", webId, "Web").Result;
    }

    public Admin GetAdmin(string adminId)
    {
        return GetObject<Admin>("clientId", adminId, "Admin").Result;
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

    public void SetNoNewMessage(string webId)
    {
        var web = GetWeb(webId);
        web.isNewMessage = false;
    }

}