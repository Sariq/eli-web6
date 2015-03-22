using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;
using MongoDB.Driver;


public class PatientService : DatabaseActions, IPatient
{
    MeetingService meetingService = new MeetingService();

    public Patient AddPatient(Patient patient)
    {
     
        Patient dbPatient = null;
        try
        {
            dbPatient = (Patient)(InsertObjectAndReturnTheObject<Patient>(patient, "Patient").Result);
        }
        catch
        {
            var error = new Error(Error.ErrorType.PatientIsAlreadyExist);
            throw new WebFaultException<Error>(error, HttpStatusCode.BadRequest);
        }
        return dbPatient;
    }

    public void RemovePatient(string patientId)
    {
        UpdateObjects("_id", patientId, "Patient", "isDelete", true);
        //RemoveObject(patientIdentityNumber, "Patient");
    }

    public void UpdatePatient(Patient patient)
    {
        UpdateObject(patient, "Patient");
    }

    public Patient GetPatient(string patientId)
    {
        return GetObject<Patient>(patientId, "Patient").Result;
    }

    public List<Patient> GetAllPatients()
    {
        return GetAllObject<Patient>("Patient");
    }

    public List<Patient> GetPatientsByIds(List<string> tmpPatients)
    {
        return GetAllObject<Patient>(tmpPatients, "Patient");
    }

    public List<Meeting> GetMeetingsOfPatient(string patientId)
    {
        var patient = GetPatient(patientId);
        var allMeetings = meetingService.GetMeetingsByIds(patient.meetings);
        return allMeetings;
    }

    public List<Assignment> GetAssignmentsOfPatient(string patientId)
    {
        var allAssignmentOfPatient = new List<Assignment>();
        var allMeetingsOfPatient = GetMeetingsOfPatient(patientId);
        foreach (Meeting meeting in allMeetingsOfPatient)
        {
            var allAssignmentOfMeeting = meetingService.GetAssignmentOfMeeting(meeting._id);
            allAssignmentOfPatient.AddRange(allAssignmentOfMeeting);
        }
        return allAssignmentOfPatient;
    }
}