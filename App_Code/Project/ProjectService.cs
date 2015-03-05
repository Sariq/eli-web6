using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;
using MongoDB.Driver;
using System.Diagnostics;


public class ProjectService : DatabaseActions, IProject
{
    public void AddProject(Project project)
    {
        InsertObject(project, "Project");
    }

    public void RemoveProject(string projectId)
    {
        RemoveObject(projectId, "Project");
    }

    public void UpdateProject(Project project)
    {
        UpdateObject(project, "Project");
    }

    public Project GetProject(string userId)
    {
        Debug.Write(userId);
        return GetObject<Project>("userId", userId, "Project").Result;
    }

    public List<Project> GetAllProjects()
    {
        return GetAllObject<Project>("Project");
    }

}