using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;

public class ReminderService : DatabaseActions, IReminder
{
    public Reminder AddReminder(Reminder reminder)
    {
        var reminderId = InsertObjectAndReturnId(reminder, "Reminder").Result;
        var dbReminder = GetReminder(reminderId);
        return dbReminder;
    }

    public void RemoveReminder(string reminderId)
    {
        RemoveObject(reminderId, "Reminder");
    }

    public void UpdateReminder(Reminder reminder)
    {
        UpdateObject(reminder, "Reminder");
    }

    public Reminder GetReminder(string newsId)
    {
        return GetObject<Reminder>(newsId, "Reminder").Result;
    }

    public List<Reminder> GetAllReminders()
    {
        return GetAllObject<Reminder>("Reminder");
    }

    public List<Reminder> GetAllFutureReminders()
    {
        var remindersList = new List<Reminder>();

        foreach (Reminder reminder in GetAllReminders())
            if (reminder.reminderTime > DateTime.Now)
                remindersList.Add(reminder);

        return remindersList;
    }

}