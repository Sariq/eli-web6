(function () {
    function newsFeed() {
        return {    
            restrict: 'E',
            templateUrl: 'newsFeed/news_feed.html',
            link: function (scope, element, attr) {

             

                var nt_example2 = $('#news-feed').newsTicker({
                    row_height: 60,
                    max_rows: 1,
                    speed: 300,
                    duration: 6000,
                    prevButton: $('#news-feed-prev'),
                    nextButton: $('#news-feed-next'),
                    hasMoved: function () {
                        $('#news-feed-infos-container').fadeOut(200, function () {
                            $('#news-feed-infos .infos-hour').text($('#news-feed li:first span').text());
                            $('#news-feed-infos .infos-text').text($('#news-feed li:first').data('infos'));
                            $(this).fadeIn(400);
                        });
                    },
                    pause: function () {
                        $('#news-feed li i').removeClass('fa-play').addClass('fa-pause');
                    },
                    unpause: function () {
                        $('#news-feed li i').removeClass('fa-pause').addClass('fa-play');
                    }
                });
                $('#news-feed-infos').hover(function () {
                    nt_example2.newsTicker('pause');
                }, function () {
                    nt_example2.newsTicker('unpause');
                });

            }
        }
    }
    angular.module('eliApp')
        .directive('newsFeed', [newsFeed]);
}());