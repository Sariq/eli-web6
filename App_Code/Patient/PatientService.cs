using MongoDB.Driver;
using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;


public class PatientService : DatabaseActions, IPatient
{ 

    public void AddPatient(Patient patient)
    {
        try
        {
            InsertObjectNotAsync(patient, "Patient");
        }
        catch (MongoDuplicateKeyException)
        {
            var error = new Error(Error.ErrorType.PatientIsAlreadyExist);
            throw new WebFaultException<Error>(error, HttpStatusCode.BadRequest);
        }
    }

    public void RemovePatient(string patientIdentityNumber)
    {
        RemoveObject(patientIdentityNumber, "Patient");
    }

    public void UpdatePatient(Patient patient)
    {
        UpdateObject(patient, "Patient");
    }

    //public Patient GetPatient(string patientIdentityNumber)
    //{
    //    return GetObject<Patient>("identity_number", patientIdentityNumber, "Patient").Result;
    //}

    public Patient GetPatient(string patientId)
    {
        return GetObject<Patient>(patientId, "Patient").Result;
    }

    public List<Patient> GetAllPatients()
    {
        return GetAllObject<Patient>("Patient");
    }

}