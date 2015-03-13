(function () {
    /** Patient Controller
     *
     * @param $location:
     * @param ReportService: Service
     * @constructor
     */
    function ReportCtrl($interval, $http, $location, $scope, $stateParams, AuthService, $modalInstance,$modal) {
        var self = this;
        self.report = { title: '', content: '', chatId: '', adminId: '' };
        
        self.saveReport = function () {
            //alert(angular.toJson(self.report))
            $modalInstance.close(self.report);
        }


}

    angular.module('eli.admin')
        .controller('ReportCtrl', ['$interval','$http', '$location', '$scope', '$stateParams','AuthService','$modalInstance','$modal', ReportCtrl]);
}());










