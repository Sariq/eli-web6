(function () {
    angular.module('eli.admin').controller('NewsFeedCtrl', function ($scope) {

        var self = this;
        self.title = '';
        self.content = '';

        self.save = function () {

            alert(self.title);

        }

    });
}());