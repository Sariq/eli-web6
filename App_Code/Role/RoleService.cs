using System.Collections.Generic;

public class RoleService : DatabaseActions, IRole
{
    public Role AddRole(Role role)
    {
        var roleId = InsertObjectAndReturnId(role, "Role").Result;
        var dbRole = GetRole(roleId);
        return dbRole;
    }

    public void RemoveRole(string roleId)
    {
        RemoveObject(roleId, "Role");
    }

    public void UpdateRole(Role role)
    {
        UpdateObject(role, "Role");
    }

    public Role GetRole(string roleId)
    {
        return GetObject<Role>(roleId, "Role").Result;
    }

    public List<Role> GetAllRoles()
    {
        return GetAllObject<Role>("Role");
    }

}