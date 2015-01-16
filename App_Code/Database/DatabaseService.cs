using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System;

public class DatabaseService : IDatabaseService
{

    #region Properties

    public readonly User userA = new User("Karin", "123", "Karin", "B", "karin@gmail.com", "K", DateTime.Today, "role", true);
    public readonly User userB = new User("Sari", "123", "Sari", "Q", "sari@gmail.com", "T", DateTime.Today, "role", true);
    public readonly User userC = new User("Adi", "123", "Adi", "B", "adi@gmail.com", "K", DateTime.Today, "role", true);
    public readonly User userD = new User("User", "123");

    public readonly Assignment assignmentA = new Assignment("AssignmentA", "FreeText", false);
    public readonly Assignment assignmentB = new Assignment("AssignmentB", "FreeText", false);

    public readonly Patient patientA = new Patient("111", "A", "A", "a@gmail.com", "A", DateTime.Today, new string[] { "AA", "BB" });
    public readonly Patient patientB = new Patient("222", "B", "B", "b@gmail.com", "B", DateTime.Today, new string[] { "AA", "BB" });

    public readonly Meeting meetingA = new Meeting("123", "123", "meetingA", "A", DateTime.Today, "FreeText", new string[] { "AA", "BB" });
    public readonly Meeting meetingB = new Meeting("123", "123", "meetingB", "B", DateTime.Today, "FreeText", new string[] { "AA", "BB" });
    
    #endregion

    public void Initialize()
    {
        CreateCollection("User");
        SetCollectionPrimeryKey("User", "userId");

        CreateCollection("Meeting");

        CreateCollection("Assignment");

        CreateCollection("Patient");
        SetCollectionPrimeryKey("Patient", "identity_number");

        InitializeUserCollection();
        InitializeMeetingCollection();
        InitializeAssignmentCollection();
        InitializePatientCollection();
    }

    private void InitializeAssignmentCollection()
    {
        var assignmentService = new AssignmentService();
        assignmentService.AddAssignment(assignmentA);
        assignmentService.AddAssignment(assignmentB);
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
        userService.AddUser(userD);
    }

    private void InitializeMeetingCollection()
    {
        var meetingService = new MeetingService();
        meetingService.AddMeeting(meetingA);
        meetingService.AddMeeting(meetingB);
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