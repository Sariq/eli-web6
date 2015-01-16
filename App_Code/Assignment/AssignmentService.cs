using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;

public class AssignmentService : DatabaseActions, IAssignment
{
    public void AddAssignment(Assignment assignment)
    {
        InsertObject(assignment, "Assignment");
        //var dbAssignment = GetAssignment(assignment._id);
        //return dbAssignment;
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
        List<Assignment> assignments = new List<Assignment> { };
        foreach (string assignmentId in tmpAssignments)
        {
            Assignment assignment = GetObject<Assignment>(assignmentId, "Assignment").Result;
            assignments.Add(assignment);
        }
        return assignments;
    }

}