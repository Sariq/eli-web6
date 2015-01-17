using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;


public class PatientService : DatabaseActions, IPatient
{ 

    public void AddPatient(Patient patient)
    {
        var dbPatient = GetPatient(patient.identity_number);
        if (dbPatient == null)
            InsertObject(patient, "Patient");
        else
        {
            var error = new Error(Error.ErrorType.PatientIsAlreadyExist);
            throw new WebFaultException<Error>(error, HttpStatusCode.BadRequest);
        }
    }

    public void RemovePatient(string patientIdentityNumber)
    {
        var dbPatient = GetPatient(patientIdentityNumber);
        if (dbPatient != null)
            RemoveObject(patientIdentityNumber, "Patient");
        else
        {
            var error = new Error(Error.ErrorType.PatientIsNotExist);
            throw new WebFaultException<Error>(error, HttpStatusCode.BadRequest);
        }
    }

    public void UpdatePatient(Patient patient)
    {
        var dbPatient = GetPatient(patient.identity_number);
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
            return GetObject<Patient>("identity_number", patientIdentityNumber, "Patient").Result;
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