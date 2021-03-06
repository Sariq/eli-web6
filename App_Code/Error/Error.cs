﻿using System.Runtime.Serialization;

[DataContract]
public class Error
{
    public enum ErrorType
    {
        PasswordIsIncorrect,
        UserIsNotExist,
        UserIsAlreadyExist,
        NoUserInHeader,
        UserInHeaderIsNotExist,
        PatientIsNotExist,
        PatientIsAlreadyExist
    }

    [DataMember] 
    public string error_description { get; set; }


    public Error(ErrorType errorType)
    {
        error_description = errorType.ToString();
    }

}