(function () {

    function NewsFeedService($resource) {
        var self = this;


        self.newsResource = $resource('/NewsService.svc/api/:id', {},
                  { update: { method: 'PUT' } }
                  );


        self.get = function (news_id) {

            return self.newsResource.get({ id: news_id });
        };
        self.remove = function (news_id) {

            return self.newsResource.remove({ id: news_id });
        };
        self.getNews = function () {
            //alert()
            return self.newsResource.query();
        }

        self.create = function () {
            var news = {

                title: "",
                content: "",
            }
            self.news = new self.newsResource(news)
            return self.news;
        };


    }

    angular.module('eli.common')
    .service('NewsFeedService', ['$resource', NewsFeedService])
}());