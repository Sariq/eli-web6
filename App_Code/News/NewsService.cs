using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Net;
using System.ServiceModel.Web;

public class NewsService : DatabaseActions, INews
{
    public News AddNews(News news)
    {
        var newsId = InsertObjectAndReturnId(news, "News").Result;
        var dbNews = GetNews(newsId);
        return dbNews;
    }

    public void RemoveNews(string newsId)
    {
        RemoveObject(newsId, "News");
    }

    public void UpdateNews(News news)
    {
        UpdateObject(news, "News");
    }

    public News GetNews(string newsId)
    {
        return GetObject<News>(newsId, "News").Result;
    }

    public List<News> GetAllNews()
    {
        return GetAllObject<News>("News");
    }

}