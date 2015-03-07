using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;

public class ReportService : DatabaseActions, IReport
{
    public Report AddReport(Report report)
    {
        var reporttId = InsertObjectAndReturnId(report, "Report").Result;
        var dbReport = GetReport(reporttId);
        UpdateObjects("chatId", report.chatId, "ChatMessage", "isHistory", true);
        return dbReport;
    }

    public void RemoveReport(string reportId)
    {
        RemoveObject(reportId, "Report");
    }

    public void UpdateReport(Report report)
    {
        UpdateObject(report, "Report");
    }

    public Report GetReport(string reportId)
    {
        return GetObject<Report>(reportId, "Report").Result;
    }

    public List<Report> GetAllReports()
    {
        return GetAllObject<Report>("Report");
    }

    public List<Report> GetReportsByIds(List<string> tmpReports)
    {
        return GetAllObject<Report>(tmpReports, "Report");
    }

}