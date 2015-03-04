using MongoDB.Bson;
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
        var user = new UserService().GetUser(dbAssignment.parentId);
        user.assignments.Add(assignment._id);
        new UserService().UpdateUser(user);
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

    public List<Assignment> GetAssignmentsByIds(List<string> tmpAssignments)
    {
        return GetAllObject<Assignment>(tmpAssignments, "Assignment");
    }

}