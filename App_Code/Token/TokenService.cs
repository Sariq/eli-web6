using System.Net;
using System.ServiceModel.Web;

public class TokenService : DatabaseActions, IToken
{
    ClientServerCommunicationActions communication = new ClientServerCommunicationActions();

    public void RefreshToken()
    {
        
        var id = communication.GetID_FromTokenInHeader();
     
        try
        {
            var obj = GetObject<User>(id, "User");
        }
        catch
        {
            var error = new Error(Error.ErrorType.NoUserInHeader);
            throw new WebFaultException<Error>(error, HttpStatusCode.BadRequest);
        }

        Token newToken = new Token(id);
        communication.SetTokenToHeader(newToken);

       
    }


    public User SignIn(User user)
    {
        return user;
    }

}