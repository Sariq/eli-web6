(function () {
    /** Report Controller
     *
     * @param $location:
     * @param ReportService: Service
     * @constructor
     */
    function ReportItemCtrl($location, $rootScope, $state, $scope, ReportService, $stateParams, TaskModalService, $modal, $http, PatientAdmin) {
        console.log("ReportItemCtrl")
        var self = this; 
        self.reportId = $stateParams.reportId;
        self.isShowChat = false;
        if (self.reportId) {
            self.report = ReportService.get(self.reportId);
        }


        self.getWebUserChat = function () {
            $http({
                url: '/ChatMessageService.svc/GetAllOnlineMessagesOfClient',
                method: 'POST',
                data: self.report.chatId
            }).then(function (response) {
                self.chatMessages = response.data;
                self.isShowChat = true;
            }, function () { alert("GetAllMessages error") });
        }


        self.remove = function () {


            ReportService.remove(self.report._id);
            $location.path('/report/list');

        };

    }

    angular.module('eli.admin')
        .controller('ReportItemCtrl', ['$location', '$rootScope', '$state', '$scope', 'ReportService', '$stateParams', 'TaskModalService', '$modal', '$http', 'PatientAdmin', ReportItemCtrl]);
}());










