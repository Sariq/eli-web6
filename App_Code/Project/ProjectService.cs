using System.Collections.Generic;
using System.Diagnostics;


public class ProjectService : DatabaseActions, IProject
{

    public Project AddProject(Project project)
    {
        return (Project)InsertObjectAndReturnTheObject<Project>(project, "Project").Result;
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

}