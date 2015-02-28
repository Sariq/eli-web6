﻿(function () {

    function NewsFeedService($resource) {
        var self = this;


        self.newsResource = $resource('/NewsService.svc/api/:id', {},
                  { update: { method: 'PUT' } }
                  );

        self.get = function (news_id) {

            return self.newsResource.get({ id: news_id });
        };


        self.getNews = function () {
            return self.mailResource.query();
        }

        self.create = function () {
            var news = {

                title: "",
                content: "",
            }
            self.news = new self.mailResource(news)
            return self.news;
        };


    }

    angular.module('eli.admin')
    .service('NewsFeedService', ['$resource', NewsFeedService])
}());