﻿using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;

public class AssignmentService : DatabaseActions, IAssignment
{
    public Assignment AddAssignment(Assignment assignment)
    {
        var assignmentId = InsertObjectAndReturnId(assignment, "Assignment").Result;
        var dbAssignment = GetAssignment(assignmentId);
        return dbAssignment;
    }

    public void RemoveAssignment(string assignmentId)
    {
        RemoveObject(assignmentId, "Assignment");
    }

    public void UpdateAssignment(Assignment assignment)
    {
        UpdateObject(assignment, "Assignment");
    }

    public Assignment GetAssignment(string assignmentId)
    {
        return GetObject<Assignment>(assignmentId, "Assignment").Result;
    }

    public List<Assignment> GetAllAssignments()
    {
        return GetAllObject<Assignment>("Assignment");
    }

    public List<Assignment> GetAssignmentsByIds(string[] tmpAssignments)
    {
        return GetAllObject<Assignment>(tmpAssignments, "Assignment");
    }

    public List<Assignment> GetAllNotDoneAssignments()
    {
        return GetAllObject<Assignment>("isDone", false, "Assignment");
    }

}