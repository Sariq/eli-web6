(function () {
    function newsFeed(NewsFeedService, $sce) {
        return {    
            restrict: 'E',
            templateUrl: 'newsFeed/news_feed.html',
            link: function (scope, element, attr) {

                scope.newsFeed = NewsFeedService.getNews();
               
//                scope.newsFeed =
//[
//{ title: "עיריית ניו יורק דנה עם הקהילה החרדית באיסור מציצת דם בברית מילה", content: "לשכתו של ראש העיר ניו יורק, ביל דה בלסיו, פתחה במשא ומתן עם נציגי הקהילה החרדית בנוגע לאפשרות של רגולציה מטעם הרשויות על טקסי ברית מילה, תוך שמירת חופש הדת." },
//// { title: "test2 Title", content: "Test22222 content Test contentTest contentTest contentTest contentTest contentTest content" }

//]

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
                            $('#news-feed-infos .infos-text').html($('#news-feed li:first').data('infos')).text();
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
        .directive('newsFeed', ['NewsFeedService','$sce', newsFeed]);
}());