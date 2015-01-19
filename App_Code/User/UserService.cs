﻿using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.ServiceModel.Web;
using System.Web;

public class UserService : DatabaseActions, IUser
{
    ClientServerCommunicationActions communication = new ClientServerCommunicationActions();

    public User SignIn(User user)
    {
        var dbUser = GetUser(user.userId);

        if (dbUser == null)
        {
            var error = new Error(Error.ErrorType.UserIsNotExist);
            throw new WebFaultException<Error>(error, HttpStatusCode.BadRequest);
        }

        if (user.password != dbUser.password)
        {
            var error = new Error(Error.ErrorType.PasswordIsIncorrect);
            throw new WebFaultException<Error>(error, HttpStatusCode.BadRequest);
        }

        if (user.isRememberMe)
            dbUser.isRememberMe = true;
        else
            dbUser.isRememberMe = false;
        UpdateUser(dbUser);

        communication.SetTokenToHeader(dbUser);

        // Example
        //var token2 = new ClientServerCommunicationActions().GetTokenFromHeader();
        //new ClientServerCommunicationActions().SetTokenToHeader(token2);
        //new ClientServerCommunicationActions().SetTokenToHeader_AllDetails_OnlyForExample(token2);
        // End Example

        return dbUser;
    }

    public void SignOut()
    {
        //if (HttpContext.Current.Request.Cookies["TokenId"] != null)
        //{
        //    HttpCookie myCookie = new HttpCookie("TokenId");
        //    myCookie.Expires = DateTime.Now.AddDays(-1d);
        //    HttpContext.Current.Response.Cookies.Add(myCookie);
        //}
    }

    public void AddUser(User user)
    {
        try
        {
            InsertObjectNotAsync(user, "User");
        }
        catch (MongoDuplicateKeyException)
        {
            var error = new Error(Error.ErrorType.UserIsAlreadyExist);
            throw new WebFaultException<Error>(error, HttpStatusCode.BadRequest);
        }
    }

    public void RemoveUser(string userId)
    {
        RemoveObject(userId, "User");
    }

    public void UpdateUser(User user)
    {
        UpdateObject(user, "User");
    }

    public User GetUser()
    {
        User user;
        try
        {
            new ClientServerCommunicationActions().GetTokenFromHeader();
        }
        catch
        {
            var error = new Error(Error.ErrorType.NoUserInHeader);
            throw new WebFaultException<Error>(error, HttpStatusCode.BadRequest);
        }

        var tokenId = new ClientServerCommunicationActions().GetID_FromTokenInHeader();

        try
        {
            user = GetObject<User>(tokenId, "User").Result;
        }
        catch
        {
            var error = new Error(Error.ErrorType.UserInHeaderIsNotExist);
            throw new WebFaultException<Error>(error, HttpStatusCode.BadRequest);
        }

        return user;
    }

    public User GetUser(string userId)
    {
        return GetObject<User>("userId", userId, "User").Result;
    }

    public List<User> GetAllUsers()
    {
        return GetAllObject<User>("User");
    }

}