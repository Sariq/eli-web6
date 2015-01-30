


using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;


using System;
using MongoDB.Driver;
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

        var dbPatient = GetPatient(patient._id);
        if (dbPatient != null)
            UpdateObject(patient, "Patient");
        else
        {
            var error = new Error(Error.ErrorType.PatientIsNotExist);
            throw new WebFaultException<Error>(error, HttpStatusCode.BadRequest);
        }

    }

    public Patient GetPatient(string patientIdentityNumber)
    {

        try
        {              
            Patient patientA = GetObject<Patient>("_id", patientIdentityNumber, "Patient").Result; 
                 return patientA;
        }
        catch
        {
            var error = new Error(Error.ErrorType.PatientIsNotExist);
            throw new WebFaultException<Error>(error, HttpStatusCode.BadRequest);
        }

    }

    public List<Patient> GetAllPatients()
    {
        return GetAllObject<Patient>("Patient");
    }

}