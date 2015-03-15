using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System;
using System.Collections.Generic;

public class DatabaseService : IDatabaseService
{

    #region Properties

    public readonly User userA = new User("Karin", "123", "Karin", "B", "karin@gmail.com", "A", Role.RoleType.Director.ToString(), true, new List<string> {}, new List<string> {}, new List<string> {}, new List<string> {});
    public readonly User userB = new User("Sari", "123", "Sari", "Q", "sari@gmail.com", "T", Role.RoleType.Director.ToString(), true, new List<string> { }, new List<string> { }, new List<string> { }, new List<string> { });
    public readonly User userC = new User("Adi", "123", "Adi", "B", "adi@gmail.com", "K", Role.RoleType.Therapist.ToString(), true, new List<string> { }, new List<string> { }, new List<string> { }, new List<string> { });

    public readonly Assignment assignmentA = new Assignment("AssignmentA", "FreeText", false, true, "123", "123");
    public readonly Assignment assignmentB = new Assignment("AssignmentB", "FreeText", false, false, "123", "123");

    public readonly Patient patientA = new Patient("12345", "Ariel Ariel", "alon@gmail.com", "Tel-Aviv", DateTime.Today, "PatiantEducation", "PatienWorkPlace", new List<Person> { new Person("PersonA", "PersonAPhoneNumber", "PersonAAge", true), new Person("PersonB", "PersonBPhoneNumber", "PersonBAge", true) }, new List<string> { "MeetingA", "MeetingB" });
    public readonly Patient patientB = new Patient("12346", "Amit Amit", "amit@gmail.com", "Tel-Aviv", DateTime.Today, "PatiantEducation", "PatienWorkPlace", new List<Person> { new Person("PersonA", "PersonAPhoneNumber", "PersonAAge", true), new Person("PersonB", "PersonBPhoneNumber", "PersonBAge", true) }, new List<string> { "MeetingA", "MeetingB" });
    public readonly Patient patientC = new Patient("12347", "Tal Tal", "tal@gmail.com", "Tel-Aviv", DateTime.Today, "School", "AA", new List<Person> { new Person("A", "A", "2", true), new Person("B", "A", "1", true) }, new List<string> { "1", "2" });

    public readonly Meeting meetingA = new Meeting("12345", "MeetingTitle", "MeetingAdress", "A", "FreeText", new List<string> { "AssignmentA", "AssignmentB" });
    public readonly Meeting meetingB = new Meeting("12346", "MeetingTitle", "MeetingAdress", "A", "FreeText", new List<string> { "AssignmentA", "AssignmentB" });
    public readonly Meeting meetingC = new Meeting("12347", "MeetingTitle", "MeetingAdress", "A", "FreeText", new List<string> { "AssignmentA", "AssignmentB" });

    public readonly MailMessage mailMessageA = new MailMessage(new List<string> { "Karin", "Karin" }, new List<string> { "Sari", "Sari" }, "MailSubject", "MailContent", true, true, true);
    public readonly MailMessage mailMessageB = new MailMessage(new List<string> { "Sari", "Sari" }, new List<string> { "Karin", "Karin" }, "MailSubject", "MailContent", true, true, true);

    public readonly News newsA = new News("NewsA", "FreeText");
    public readonly News newsB = new News("NewsB", "FreeText");

    public readonly Reminder reminderA = new Reminder(DateTime.Today, "ReminderA", "Assignment", "ReminderTitle");
    public readonly Reminder reminderB = new Reminder(DateTime.Today, "ReminderB", "Meeting", "ReminderTitle");

    public readonly Role directorRole = new Role(Role.RoleType.Director);
    public readonly Role therapistRole = new Role(Role.RoleType.Therapist);
    public readonly Role secretaryRole = new Role(Role.RoleType.Secretary);

    public readonly Contact contactA = new Contact("nameA", "email@gmail.com", "ContactA", "FreeText");
    public readonly Contact contactB = new Contact("nameB", "email@gmail.com", "ContactB", "FreeText");

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

        CreateCollection("ChatMessage");

        CreateCollection("MailMessage");

        CreateCollection("News");

        CreateCollection("Reminder");

        CreateCollection("Project");

        CreateCollection("Role");

        CreateCollection("Contact");

        InitializeUserCollection();
        InitializeMeetingCollection();
        InitializeAssignmentCollection();
        InitializePatientCollection();
        InitializeMailMessageCollection();
        InitializeNewsCollection();
        InitializeReminderCollection();
        InitializeRoleCollection();
        InitializeContactCollection();
    }

    private void InitializeRoleCollection()
    {
        var roleService = new RoleService();
        roleService.AddRole(directorRole);
        roleService.AddRole(therapistRole);
        roleService.AddRole(secretaryRole);
    }

    private void InitializeContactCollection()
    {
        var contactService = new ContactService();
        contactService.AddContact(contactA);
        contactService.AddContact(contactB);
    }

    private void InitializeAssignmentCollection()
    {
        var assignmentService = new AssignmentService();
        assignmentService.AddAssignment(assignmentA);
        assignmentService.AddAssignment(assignmentB);
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
        patientService.AddPatient(patientB);
    }

    private void InitializeUserCollection()
    {
        var userService = new UserService();
        userService.AddUser(userA);
        userService.AddUser(userB);
        userService.AddUser(userC); 
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
        mailMessageService.SendMailMessage(mailMessageA);
        mailMessageService.SendMailMessage(mailMessageB);
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