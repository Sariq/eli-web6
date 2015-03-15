using System.Collections.Generic;

public class ContactService : DatabaseActions, IContact
{
    public Contact AddContact(Contact contact)
    {
        var contactId = InsertObjectAndReturnId(contact, "Contact").Result;
        var dbContact = GetContact(contactId);
        return dbContact;
    }

    public void RemoveContact(string contactId)
    {
        RemoveObject(contactId, "Contact");
    }

    public void UpdateContact(Contact contact)
    {
        UpdateObject(contact, "Contact");
    }

    public Contact GetContact(string contactId)
    {
        return GetObject<Contact>(contactId, "Contact").Result;
    }

    public List<Contact> GetAllContacts()
    {
        return GetAllObject<Contact>("Contact");
    }

}