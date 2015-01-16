using JWT;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Script.Serialization;
using System.Runtime.Serialization.Json;
using System.IO;
using System.Text;


public class ClientServerCommunicationActions
{
    public void SetTokenToHeader(User user)
    {
        var response = HttpContext.Current.Response;
        var token = new Token(user);
        response.Headers.Add("id_token", JWT.JsonWebToken.Encode(token, "elile", JwtHashAlgorithm.HS256));
    }

    public void SetTokenToHeader(Token token)
    {
        var response = HttpContext.Current.Response;
        var setToken = new Token(token._id);
        response.Headers.Add("id_token", JWT.JsonWebToken.Encode(setToken, "elile", JwtHashAlgorithm.HS256));
    }

    public void SetTokenToHeader_AllDetails_OnlyForExample(Token token)
    {
        var response = HttpContext.Current.Response;
        response.Headers.Add("id_token2", JWT.JsonWebToken.Encode(token, "elile", JwtHashAlgorithm.HS256));

        var x = new ClientServerCommunicationActions().GetID_FromTokenInHeader();
        response.Headers.Add("id_token_ID", x);
        x = new ClientServerCommunicationActions().GetEXP_FromTokenInHeader();
        response.Headers.Add("id_token_EXP", x);
        x = new ClientServerCommunicationActions().GetJTI_FromTokenInHeader();
        response.Headers.Add("id_token_JTI", x);

        var tokenString = HttpContext.Current.Response.Headers.Get("id_token2");
        var token2 = JWT.JsonWebToken.Decode(tokenString, "elile");
        response.Headers.Add("id_token2_decode", token2);
    }

    public Token GetTokenFromHeader()
    {
        var request = HttpContext.Current.Request;
        string tokenString = request.Headers["Authorization"];
        //var tokenString = HttpContext.Current.Response.Headers.Get("id_token");
        var token = JWT.JsonWebToken.Decode(tokenString, "elile");

        DataContractJsonSerializer serToken = new DataContractJsonSerializer(typeof(Token));
        MemoryStream streamToken = new MemoryStream(Encoding.UTF8.GetBytes(token));
        Token tokenObj = (Token)serToken.ReadObject(streamToken);
        return tokenObj;
    }

    public string GetID_FromTokenInHeader()
    {
        Token token = GetTokenFromHeader();
        return token._id;
    }

    public string GetEXP_FromTokenInHeader()
    {
        Token token = GetTokenFromHeader();
        return token.exp;
    }

    public String GetJTI_FromTokenInHeader()
    {
        Token token = GetTokenFromHeader();
        return token._jti;
    }

}