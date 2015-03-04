using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System;
using System.Collections.Generic;

public class DatabaseService : IDatabaseService
{

    #region Properties

    public readonly User userA = new User("Karin", "123", "Karin", "B", "karin@gmail.com", "K", "role", true, new List<string> { "1", "2" }, new List<string> { "1", "2" });
    public readonly User userB = new User("Sari", "123", "Sari", "Q", "sari@gmail.com", "T", "role", true, new List<string> { "1", "2" }, new List<string> {"1","2"});
    public readonly User userC = new User("Adi", "123", "Adi", "B", "adi@gmail.com", "K", "role", true, new List<string> { "1", "2" }, new List<string> { "1", "2" });
    public readonly User userD = new User("User", "123");

    public readonly Assignment assignmentA = new Assignment("AssignmentA", "FreeText", false, true, "1");
    public readonly Assignment assignmentB = new Assignment("AssignmentB", "FreeText", false, false, "1");

    //public readonly Patient patientA = new Patient("111", "A", "a@gmail.com", "A", DateTime.Today, "AA", "AA", new List<Person> { new Person("A", "A", "2", true), new Person("B", "A", "1", true) }, new List<Meeting> { new Meeting("1", "2", "3", "4", "s", new List<string> { "123", "karin" }) });
    //public readonly Patient patientB = new Patient("222", "A", "a@gmail.com", "A", DateTime.Today, "AA", "AA", new List<Person> { new Person("A", "A", "3", true), new Person("B", "A", "2", true) });
    public readonly Patient patientA = new Patient("111", "A", "a@gmail.com", "A", DateTime.Today, "AA", "AA", new List<Person> { new Person("A", "A", "2", true), new Person("B", "A", "1", true) }, new List<string> { "1", "2" });

    public readonly Meeting meetingA = new Meeting("123", "123", "meetingA", "A", "FreeText", new List<string> { "1", "2" });
    public readonly Meeting meetingB = new Meeting("123", "123", "meetingB", "B", "FreeText", new List<string> {"1","2"});
   
    public readonly MailMessage mailMessage = new MailMessage(new List<string> { "123", "karin" }, new List<string> { "123", "karin" }, "subject", "content", true, true, true);

    public readonly News newsA = new News("NewsA", "FreeText");
    public readonly News newsB = new News("NewsB", "FreeText");

    public readonly Reminder reminderA = new Reminder(DateTime.Today, "ReminderA", "Assignment", "22");
    public readonly Reminder reminderB = new Reminder(DateTime.Today, "ReminderB", "Meeting", "22");

    #endregion

    public void Initialize()
    {
        CreateCollection("User");
        SetCollectionPrimeryKey("User", "userId");

        CreateCollection("Meeting");

        CreateCollection("Assignment");

        CreateCollection("Patient");
        SetCollectionPrimeryKey("Patient", "identityNumber");

        CreateCollection("Web");

        CreateCollection("Admin");

        CreateCollection("OnlineMessage");

        CreateCollection("MessageHistory");

        CreateCollection("News");

        CreateCollection("Reminder");

        CreateCollection("Project");

        InitializeUserCollection();
        InitializeMeetingCollection();
        InitializeAssignmentCollection();
        InitializePatientCollection();
        InitializeMailMessageCollection();
        InitializeNewsCollection();
        InitializeReminderCollection();
    }

    private void InitializeAssignmentCollection()
    {
        var assignmentService = new AssignmentService();
        //assignmentService.AddAssignment(assignmentA);
        //assignmentService.AddAssignment(assignmentB);
    }

    private void InitializeReminderCollection()
    {
        var reminderService = new ReminderService();
        reminderService.AddReminder(reminderA);
        reminderService.AddReminder(reminderB);
    }

    private void InitializePatientCollection()
    {
        var patientService = new PatientService();
        patientService.AddPatient(patientA);
        //patientService.AddPatient(patientB);
    }

    private void InitializeUserCollection()
    {
        var userService = new UserService();
        userService.AddUser(userA);
        userService.AddUser(userB);
        userService.AddUser(userC);
        userService.AddUser(userD);
    }

    private void InitializeMeetingCollection()
    {
        var meetingService = new MeetingService();
        meetingService.AddMeeting(meetingA);
        meetingService.AddMeeting(meetingB);
    }

    private void InitializeMailMessageCollection()
    {
        var mailMessageService = new MailMessageService();
        mailMessageService.SendMailMessage(mailMessage);
    }

    private void InitializeNewsCollection()
    {
        var newsService = new NewsService();
        newsService.AddNews(newsA);
        newsService.AddNews(newsB);
    }

    private MongoDatabase GetDatabase()
    {
        MongoClient client = new MongoClient();
        var server = client.GetServer();
        var database = server.GetDatabase("ELI");
        return database;
    }

    private void CreateCollection(string collectionName)
    {
        var database = GetDatabase();
        var collection = database.CreateCollection(collectionName);
    }

    public MongoCollection GetCollection(string collectionName)
    {
        var database = GetDatabase();
        var collection = database.GetCollection(collectionName);
        return collection;
    }

    private void SetCollectionPrimeryKey(string collectionName, string primeryKeyName)
    {
        var collection = GetCollection(collectionName);
        collection.EnsureIndex(new IndexKeysBuilder().Ascending(primeryKeyName), IndexOptions.SetUnique(true));
    }
}