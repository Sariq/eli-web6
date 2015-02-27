(function () {

    function routes($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('news', {
                url: '/news',
                templateUrl: 'news_feed/views/list/list.html',
                controller: 'NewsListController',
                controllerAs: 'list'

            })

            .state('news/add', {
                url: '/news/add',
                templateUrl: 'news_feed/views/add/add.html',
                controller: 'NewsAddController',
                controllerAs: 'add'

            })

           .state('news/item/:newsId', {
               url: '/news/item/:newsId',
               templateUrl: 'news_feed/views/item/item.html',
               controller: 'NewsItemController',
               controllerAs: 'item'

           })
          .state('news/edit/:newsId', {
              url: '/news/edit/:newsId',
              templateUrl: 'news_feed/views/add/add.html',
              controller: 'NewsAddController',
              controllerAs: 'add'

          })

    }
    angular.module('eli.admin')
      .config(['$stateProvider', '$urlRouterProvider', routes])

}());
