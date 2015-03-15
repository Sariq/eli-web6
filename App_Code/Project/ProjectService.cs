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

        var assignmentService = new AssignmentService();
        var userService = new UserService();
        var reminderService = new ReminderService();

        var allAssignmentInProject = new List<string>();
        foreach (Assignment assignment in assignmentService.GetAllAssignments())
        {
            if (assignment.projectId == projectId)
            {
                allAssignmentInProject.Add(assignment._id);
                assignmentService.RemoveAssignment(assignment._id);
            }
        }
        foreach (User user in userService.GetAllUsers())
        {
            if (user.projects.Contains(projectId))
            {
                user.projects.Remove(projectId);
                foreach (string assignmentId in allAssignmentInProject)
                {
                    if (user.projectAassignments.Contains(assignmentId))
                        user.projectAassignments.Remove(assignmentId);                  
                }
            }
            
            var userReminders = new List<string>(user.reminders);
            if (userReminders.Count != 0)
            {
                foreach (string reminderId in userReminders)
                {
                    foreach (string assignmentId in allAssignmentInProject)
                    {

                        if (reminderService.GetReminder(reminderId).dataId == assignmentId)
                        {
                            user.reminders.Remove(reminderId);
                            reminderService.RemoveReminder(reminderId);
                            break;
                        }
                    }
                }
            }
            UpdateObject(user, "User");
        }
       
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