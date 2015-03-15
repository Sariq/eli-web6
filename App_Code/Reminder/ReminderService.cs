using System.Collections.Generic;

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

    public List<Reminder> GetAllNotApprovedReminders(List<string> tmpReminders)
    {
        return GetAllObject<Reminder>("isApproved", false, "Reminder");
    }

}