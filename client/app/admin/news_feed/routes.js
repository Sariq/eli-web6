(function () {

    function routes($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('news_feed', {
                url: '/news_feed',
                templateUrl: 'news_feed/news_feed.html',
                controller: 'NewsFeedCtrl',
                controllerAs: 'newsFeed'

            })

    }
    angular.module('eli.admin')
      .config(['$stateProvider', '$urlRouterProvider', routes])

}());
