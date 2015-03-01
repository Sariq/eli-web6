using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;
using System.Linq;

public class UserService : DatabaseActions, IUser
{
    ClientServerCommunicationActions communication = new ClientServerCommunicationActions();

    public User SignIn(User user)
    {
        var dbUser = GetUserForSignIn(user.userId);

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

    public void RemoveUser(string id)
    {
        RemoveObject(id, "User");
    }

    public void UpdateUser(User user)
    {
        UpdateObject(user, "User");
    }

    public User GetUser(string id)
    {
        return GetObject<User>(id, "User").Result;
    }

    public User GetUserForSignIn(string userId)
    {
        try
        {
            User user = GetObject<User>("userId", userId, "User").Result;
            return user;
        }
        catch
        {
            var error = new Error(Error.ErrorType.UserIsNotExist);
            throw new WebFaultException<Error>(error, HttpStatusCode.BadRequest);
        }
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
    
    public List<User> GetAllUsers()
    {
        return GetAllObject<User>("User");
    }

    public List<Meeting> GetAllMeetingsOfUser(string userId)
    {
        return GetAllObject<Meeting>("therapistId", userId, "Meeting");
    }

    public List<Assignment> GetAllMeetingAssignmentsOfUser(string userId)
    {
        return GetAllAssignmentsOfUser(userId, assignment => !assignment.isProject);
    }

    public List<Assignment> GetAllProjectAssignmentsOfUser(string userId)
    {
        return GetAllAssignmentsOfUser(userId, assignment => assignment.isProject);
    }

    private List<Assignment> GetAllAssignmentsOfUser(string userId, Predicate<Assignment> p)
    {
        var allAssinmentsOfUSer = GetAllObject<Assignment>(GetUser(userId).assignments, "Assignment");
        var allMeetingAssignmentOfUser = allAssinmentsOfUSer.FindAll(p);
        List<Assignment> sortedList = allMeetingAssignmentOfUser.OrderBy(assignment => assignment._date).ToList();
        return sortedList;
    }

}