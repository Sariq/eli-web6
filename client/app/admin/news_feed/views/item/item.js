(function () {
    /** Meeting Controller
     *
     * @param $location:
     * @param NewsFeedService: Service
     * @constructor
     */
    function NewsItemController($location, $rootScope, $state, $scope, NewsFeedService, $stateParams, TaskModalService, $modal, $http, PatientAdmin) {
        console.log("NewsItemController")
        var self = this;

        self.patient = PatientAdmin.getPatient();

        self.newsId = $stateParams.newsId;

        if (self.newsId) {
            self.news = NewsFeedService.get(self.newsId);
        }

        self.remove = function () {

            console.log(self.news)
            NewsFeedService.remove(self.newsId).$promise.then(function () {
                $location.path('/news');
            })
           
        }


    }

    angular.module('eli.admin')
        .controller('NewsItemController', ['$location', '$rootScope', '$state', '$scope', 'NewsFeedService', '$stateParams', 'TaskModalService', '$modal', '$http', 'PatientAdmin', NewsItemController]);
}());










