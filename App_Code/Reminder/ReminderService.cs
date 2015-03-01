using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;
using System.Timers;

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

    public Reminder GetReminder(string reminderId)
    {
        return GetObject<Reminder>(reminderId, "Reminder").Result;
    }

    public List<Reminder> GetAllReminders()
    {
        return GetAllObject<Reminder>("Reminder");
    }

    public List<Reminder> GetRemindersByIds(List<string> tmpReminders)
    {
        return GetAllObject<Reminder>(tmpReminders, "Reminder");
    }

    public void ApproveReminder(string reminderId)
    {
        var reminder = GetReminder(reminderId);
        reminder.isApproved = true;
        UpdateReminder(reminder);
    }

    //public List<Reminder> GetAllFutureReminders()
    //{
    //    var remindersList = new List<Reminder>();

    //    foreach (Reminder reminder in GetAllReminders())
    //        if (reminder.reminderTime > DateTime.Now)
    //            remindersList.Add(reminder);

    //    return remindersList;
    //}

    //private Timer _timer;
    //private Int32 _hours = 0;
    //private Int32 _runAt = 3;

    //protected override void OnStart(string[] args)
    //{
    //    _hours = (24 - (DateTime.Now.Hour + 1)) + _runAt;
    //    _timer = new Timer();
    //    _timer.Interval = _hours * 60 * 60 * 1000;
    //    _timer.Elapsed += new ElapsedEventHandler(Tick);
    //    _timer.Start();
    //}

    //void Tick(object sender, ElapsedEventArgs e)
    //{
    //    if (_hours != 24)
    //    {
    //        _hours = 24;
    //        _timer.Interval = _hours * 60 * 60 * 1000;
    //    }

    //    RunImport();
    //}

}