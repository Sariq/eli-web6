using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;
using System.Linq;
using System.Diagnostics;

public class UserService : DatabaseActions, IUser
{
    ClientServerCommunicationActions communication = new ClientServerCommunicationActions();
    PatientService patientService = new PatientService();
    ReminderService reminderService = new ReminderService();

    public User SignIn(User user)
    {
        Debug.Write("user");
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

    public List<User> GetUsersByIds(List<string> tmpUsers)
    {
        return GetAllObject<User>(tmpUsers, "User");
    }

    public List<Patient> GetPatientsOfUser(string userId)
    {
        var user = GetUser(userId);
        var allPatients = patientService.GetPatientsByIds(user.patients);
        return allPatients;
    }

    public List<Meeting> GetMeetingsOfUser(string userId)
    {
        var allMeetingsOfUser = new List<Meeting>();
        var allPatientsOfUser = GetPatientsOfUser(userId);
        foreach (Patient patient in allPatientsOfUser)
        {
            var allMeetingsOfPatient = patientService.GetMeetingsOfPatient(patient._id);
            allMeetingsOfUser.AddRange(allMeetingsOfPatient);
        }
        return allMeetingsOfUser.OrderBy(meeting => meeting._date).ToList();
    }

    public List<Assignment> GetAssignmentsOfUser(string userId)
    {
        var allAssignmentsOfUser = new List<Assignment>();
        var allPatientsOfUser = GetPatientsOfUser(userId);
        foreach (Patient patient in allPatientsOfUser)
        {
            var allAssignmentOfPatient = patientService.GetAssignmentsOfPatient(patient._id);
            allAssignmentsOfUser.AddRange(allAssignmentOfPatient);
        }
        return allAssignmentsOfUser.OrderBy(assignment => assignment._date).ToList();
    }

    public List<Reminder> GetAllApprovedRemindersOfUser(string userId)
    {
        var user = GetUser(userId);
        var allNotApprovedRemindersOfUser = reminderService.GetRemindersByIds(user.reminders);
        return allNotApprovedRemindersOfUser.OrderBy(reminder => reminder.reminderTime).ToList();
    }

    public List<Reminder> GetAllNotApprovedRemindersOfUser(string userId)
    {
        var user = GetUser(userId);
        var allNotApprovedRemindersOfUser = reminderService.GetAllNotApprovedReminders(user.reminders);
        return allNotApprovedRemindersOfUser.OrderBy(reminder => reminder.reminderTime).ToList();
    }

    public void AddAssignmentOfProjectToUsers(List<string> list)
    {
        string assignmentId = list.LastOrDefault();
        list.RemoveAt(list.Count - 1);
        
        foreach (string id in list)
        {
            var user = GetUser(id);
            user.assignments.Add(assignmentId);
            UpdateUser(user);
        }
    }
}