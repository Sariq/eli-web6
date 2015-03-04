﻿using System.Collections.Generic;

public class ProjectService : DatabaseActions, IProject
{
    public void AddProject(List<Project> project)
    {
        //var projectId = InsertObjectAndReturnId(project, "Project").Result;
       // var dbProject = GetProject(projectId);
       // return dbProject;
    }

    public void RemoveProject(string projectId)
    {
        RemoveObject(projectId, "Project");
    }

    public void UpdateProject(Project project)
    {
        UpdateObject(project, "Project");
    }

    public Project GetProject(string projectId)
    {
        return GetObject<Project>(projectId, "Project").Result;
    }

    public List<Project> GetAllProjects()
    {
        return GetAllObject<Project>("Project");
    }

    public List<User> GetAllToUsers(List<string> usersId)
    {
        return GetAllObject<User>(usersId, "User");
    }

    public void ForwordAssignmentToUsers(string assignmentId, List<string> usersId)
    {
        //var assignment = new AssignmentService().GetAssignment(assignmentId);
        //foreach (string id in usersId)
        //{

        //}
        //GetAllObject<User>(usersId, "User");
    }

}