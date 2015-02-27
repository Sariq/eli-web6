(function () {
    angular.module('eli.admin').controller('NewsAddController', function ($scope, $location,$stateParams, NewsFeedService) {

        var self = this;

        self.newsId = $stateParams.newsId;
        if (self.newsId) {
            self.news = NewsFeedService.get(self.newsId);
        } else {
            self.isNew = true;
            self.news = NewsFeedService.create();
        }

        self.save = function () {
            if (self.isNew) {
                self.news.$save(function (response) {
                    console.log(response);
                });
            } else {
                self.news.$update(function (response) {
                    console.log(response);
                });

            }

            $location.path('/news');
        }




    });
}());