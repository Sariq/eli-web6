﻿using System;
using System.Runtime.Serialization;

[DataContract]
public class Assignment : DatabaseObject
{
    [DataMember] 
    public string title { get; set; }
    [DataMember]
    public string content { get; set; }
    [DataMember]
    public bool isDone { get; set; }
    [DataMember]
    public bool isProject { get; set; }
    [DataMember]
    public string projectId { get; set; }
    [DataMember]
    public string idInProject { get; set; }

    public Assignment(string title, string content, bool isDone, bool isProject, string projectId, string idInProject)
        : base()
    {
        this.title = title;
        this.content = content;
        this.isDone = isDone;
        this.isProject = isProject;
        this.projectId = projectId;
        this.idInProject = idInProject;
    }

    public Assignment(Assignment assignment)
        : base()
    {
        this._id = assignment._id;
        this._date = assignment._date;
        this.title = assignment.title;
        this.content = assignment.content;
        this.isDone = assignment.isDone;
        this.isProject = assignment.isProject;
        this.projectId = assignment.projectId;
        this.idInProject = assignment.idInProject;
    }

}